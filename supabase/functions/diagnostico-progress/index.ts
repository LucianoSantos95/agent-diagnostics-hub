// Handles all UPDATE/UPSERT mutations for the anonymous diagnostic flow via
// service role, so RLS on the tables can safely block anon UPDATE.
//
// Payload:
//   { action: 'session_step' | 'session_finalize' | 'resposta_upsert'
//           | 'resultado_visto' | 'playbook_download'
//           | 'lead_email' | 'lead_orcamento' | 'lead_cta',
//     session_id: string,
//     ...fields }

import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function isUuid(v: unknown): v is string {
  return typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const { action, session_id } = body ?? {};
    if (!isUuid(session_id)) {
      return json({ error: 'invalid_session_id' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Session must exist; prevents writing rows for arbitrary UUIDs supplied by clients.
    const { data: session, error: sessErr } = await supabase
      .from('diagnostico_sessions')
      .select('id, completed_at')
      .eq('id', session_id)
      .maybeSingle();
    if (sessErr) throw sessErr;
    if (!session) return json({ error: 'session_not_found' }, 404);

    switch (action) {
      case 'session_step': {
        const step = Number(body.current_step);
        if (!Number.isInteger(step) || step < 0 || step > 100) return json({ error: 'invalid_step' }, 400);
        const { error } = await supabase
          .from('diagnostico_sessions')
          .update({ current_step: step })
          .eq('id', session_id);
        if (error) throw error;
        return json({ ok: true });
      }
      case 'session_finalize': {
        const categoria = String(body.categoria_resultado ?? '').slice(0, 64);
        if (!categoria) return json({ error: 'invalid_categoria' }, 400);
        const now = new Date().toISOString();
        const { error } = await supabase
          .from('diagnostico_sessions')
          .update({ completed_at: now, categoria_resultado: categoria })
          .eq('id', session_id);
        if (error) throw error;
        return json({ ok: true });
      }
      case 'resultado_visto': {
        const { error } = await supabase
          .from('diagnostico_sessions')
          .update({ resultado_visto_at: new Date().toISOString() })
          .eq('id', session_id)
          .is('resultado_visto_at', null);
        if (error) throw error;
        return json({ ok: true });
      }
      case 'playbook_download': {
        const formato = String(body.formato ?? '').slice(0, 16) || null;
        const { error } = await supabase
          .from('diagnostico_sessions')
          .update({
            playbook_baixado_at: new Date().toISOString(),
            playbook_formato: formato,
          })
          .eq('id', session_id);
        if (error) throw error;
        return json({ ok: true });
      }
      case 'resposta_upsert': {
        const pergunta = Number(body.pergunta_numero);
        const valor = String(body.resposta_valor ?? '').slice(0, 4000);
        if (!Number.isInteger(pergunta) || pergunta < 1 || pergunta > 50 || !valor) {
          return json({ error: 'invalid_resposta' }, 400);
        }
        const { error } = await supabase
          .from('diagnostico_respostas')
          .upsert(
            { session_id, pergunta_numero: pergunta, resposta_valor: valor },
            { onConflict: 'session_id,pergunta_numero' },
          );
        if (error) throw error;
        return json({ ok: true });
      }
      case 'lead_email': {
        const email = String(body.email ?? '').trim().slice(0, 320);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'invalid_email' }, 400);
        const { error } = await supabase
          .from('diagnostico_leads')
          .upsert({ session_id, email, quer_consultoria: false }, { onConflict: 'session_id' });
        if (error) throw error;
        return json({ ok: true });
      }
      case 'lead_orcamento': {
        const orcamento = String(body.orcamento ?? '').trim().slice(0, 120);
        if (!orcamento) return json({ error: 'invalid_orcamento' }, 400);
        const { error } = await supabase
          .from('diagnostico_leads')
          .upsert({ session_id, orcamento }, { onConflict: 'session_id' });
        if (error) throw error;
        return json({ ok: true });
      }
      case 'lead_cta': {
        const { error } = await supabase
          .from('diagnostico_leads')
          .upsert({ session_id, quer_consultoria: true }, { onConflict: 'session_id' });
        if (error) throw error;
        return json({ ok: true });
      }
      default:
        return json({ error: 'unknown_action' }, 400);
    }
  } catch (err) {
    console.error('diagnostico-progress error', err);
    return json({ error: 'internal_error' }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
