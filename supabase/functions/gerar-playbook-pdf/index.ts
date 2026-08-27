// Edge function: gera o PDF do playbook a partir do objeto Playbook que o
// front já montou (montarPlaybook), sobe no Storage e devolve uma URL assinada.
// Se vier `email`, também dispara o envio pelo send-transactional-email.
//
// Payload:
//   { session_id: string; playbook: Playbook; email?: string }
//
// Dependências: bucket `diagnosticos-pdf` (privado), template `diagnostico-resultado`.

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { PDFDocument, StandardFonts, rgb } from 'npm:pdf-lib@1.17.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const isUuid = (v: unknown): v is string =>
  typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

// ---- tipos mínimos (espelho parcial do Playbook do front) ----
interface Passo { titulo?: string; detalhe?: string }
interface Ferramenta {
  nome?: string; url?: string; oQueResolve?: string; dificuldade?: number;
  tempoSetup?: string; precoBRL?: string; precisaCartao?: boolean;
  requisitos?: string[]; passos?: Passo[]; primeiroTeste?: string; erros?: string[];
}
interface Integracao { titulo?: string; quando?: string; precisaChaveApi?: boolean; passos?: Passo[]; resultado?: string }
interface Playbook {
  forma?: string;
  perfil?: string;
  categoria?: string;
  tituloResultado?: string;
  headline?: string;
  subheadline?: string;
  resumo?: string;
  resumoBullets?: string[];
  jaUsa?: string[];
  pontoDePartida?: Ferramenta;
  alternativas?: Ferramenta[];
  integracoes?: Integracao[];
  quandoEvoluir?: string[];
  checklist?: string[];
  notaFerramentasGerais?: string;
}

const DIF = ['', 'Fácil — qualquer pessoa monta', 'Média — dá pra fazer sozinho com atenção', 'Técnica — melhor com ajuda de alguém de tecnologia'];
const CAT_LABEL: Record<string, string> = {
  atendimento: 'Atendimento', vendas: 'Vendas e follow-up', operacao: 'Operação', financeiro: 'Financeiro',
};

function s(v: unknown, max = 4000): string {
  return typeof v === 'string' ? v.slice(0, max) : '';
}
function arr(v: unknown): unknown[] {
  return Array.isArray(v) ? v.slice(0, 40) : [];
}

function wrap(text: string, max: number): string[] {
  const out: string[] = [];
  for (const raw of (text ?? '').split('\n')) {
    const words = raw.split(/\s+/).filter(Boolean);
    let line = '';
    for (const w of words) {
      if ((line + ' ' + w).trim().length > max) { if (line) out.push(line); line = w; }
      else line = (line + ' ' + w).trim();
    }
    out.push(line);
  }
  return out.length ? out : [''];
}

async function gerarPdf(pb: Playbook): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const W = 595, H = 842, M = 48;
  const brand = rgb(0.31, 0.27, 0.9);      // #4f46e5
  const ink = rgb(0.06, 0.09, 0.16);
  const muted = rgb(0.4, 0.45, 0.53);
  const rule = rgb(0.9, 0.91, 0.96);

  let page = pdf.addPage([W, H]);
  let y = H - M;

  const nl = (n = 1) => { y -= 14 * n; };
  const ensure = (need: number) => {
    if (y - need < M) { page = pdf.addPage([W, H]); y = H - M; }
  };
  const text = (str: string, opts: { size?: number; font?: typeof font; color?: typeof ink; indent?: number; gap?: number } = {}) => {
    const size = opts.size ?? 10.5;
    const f = opts.font ?? font;
    const color = opts.color ?? ink;
    const x = M + (opts.indent ?? 0);
    const maxChars = Math.floor((W - M - x) / (size * 0.52));
    for (const ln of wrap(str, maxChars)) {
      ensure(size + 4);
      page.drawText(ln, { x, y, size, font: f, color });
      y -= size + (opts.gap ?? 4);
    }
  };
  const h2 = (str: string) => {
    nl(0.6); ensure(30);
    page.drawText(str.toUpperCase(), { x: M, y, size: 10, font: bold, color: brand });
    y -= 8;
    page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 1, color: rule });
    y -= 14;
  };
  const bullets = (items: unknown[], indent = 0) => {
    for (const it of items) {
      const t = s(it, 600); if (!t) continue;
      ensure(16);
      page.drawText('•', { x: M + indent, y, size: 10.5, font, color: brand });
      const saved = y;
      text(t, { indent: indent + 12 });
      if (y === saved) y -= 14;
    }
  };
  const passos = (list: unknown[], indent = 0) => {
    list.forEach((p, i) => {
      const pp = (p ?? {}) as Passo;
      ensure(20);
      page.drawText(`${i + 1}.`, { x: M + indent, y, size: 10.5, font: bold, color: brand });
      text(s(pp.titulo, 240), { indent: indent + 16, font: bold });
      if (pp.detalhe) text(s(pp.detalhe, 1200), { indent: indent + 16, color: muted });
      nl(0.3);
    });
  };
  const ficha = (f: Ferramenta) => {
    const rows: [string, string][] = [
      ['Dificuldade', DIF[Number(f.dificuldade) || 2] ?? ''],
      ['Tempo de setup', s(f.tempoSetup, 120)],
      ['Preço', s(f.precoBRL, 400)],
      ['Cartão pra começar?', f.precisaCartao ? 'Sim' : 'Não'],
      ['Link', s(f.url, 200)],
    ];
    for (const [k, v] of rows) {
      if (!v) continue;
      ensure(16);
      page.drawText(k, { x: M, y, size: 9.5, font: bold, color: muted });
      text(v, { indent: 130, size: 9.5 });
    }
  };

  // ===== Cabeçalho =====
  page.drawRectangle({ x: 0, y: H - 92, width: W, height: 92, color: brand });
  page.drawText('Focus Indica', { x: M, y: H - 44, size: 20, font: bold, color: rgb(1, 1, 1) });
  page.drawText('Seu playbook', { x: M, y: H - 66, size: 11, font, color: rgb(0.88, 0.9, 1) });
  y = H - 92 - 28;

  text(s(pb.headline || pb.tituloResultado, 240), { size: 16, font: bold });
  nl(0.2);
  const metaBits = [
    pb.perfil ? `Perfil: ${s(pb.perfil, 40)}` : '',
    pb.categoria ? `Frente: ${CAT_LABEL[s(pb.categoria)] ?? s(pb.categoria)}` : '',
    `Gerado em ${new Date().toLocaleDateString('pt-BR')}`,
  ].filter(Boolean).join('  ·  ');
  text(metaBits, { size: 9, color: muted });
  nl(0.4);
  if (pb.subheadline) text(s(pb.subheadline, 600));
  if (pb.resumo) { nl(0.3); text(s(pb.resumo, 1200), { color: muted }); }

  const forma = s(pb.forma) || 'uma-ferramenta';
  const ponto = pb.pontoDePartida ?? {};

  if (forma === 'agente') {
    h2('O que um agente resolve no seu caso');
    bullets(arr(pb.resumoBullets));
    h2('Como se preparar pra conversa');
    bullets(arr(pb.checklist));
    if (arr(pb.quandoEvoluir).length) { h2('Contexto — pra onde isso evolui'); bullets(arr(pb.quandoEvoluir)); }
  } else if (forma === 'validar') {
    h2('Perguntas pra responder antes de escolher ferramenta');
    bullets(arr(pb.resumoBullets));
    h2('Enquanto isso');
    text('Ter o ChatGPT, Claude ou Gemini aberto no dia a dia já resolve boa parte do trabalho manual de texto — comece por um só, sem compromisso de escolher a stack ainda.');
    h2('Checklist');
    bullets(arr(pb.checklist));
  } else {
    // uma-ferramenta / ferramenta-mais-complemento
    h2(forma === 'ferramenta-mais-complemento' ? `Peça 1 — ${s(ponto.nome, 80)}` : `Seu ponto de partida — ${s(ponto.nome, 80)}`);
    if (ponto.oQueResolve) text(s(ponto.oQueResolve, 800));
    nl(0.3);
    ficha(ponto);
    if (arr(ponto.requisitos).length) { nl(0.4); text('Antes de começar', { font: bold }); bullets(arr(ponto.requisitos)); }
    nl(0.4); text('Passo a passo', { font: bold });
    passos(arr(ponto.passos));
    if (ponto.primeiroTeste) { nl(0.3); text('Como saber que funcionou', { font: bold }); text(s(ponto.primeiroTeste, 800), { color: muted }); }
    if (arr(ponto.erros).length) { nl(0.3); text('Erros comuns nesse setup', { font: bold }); bullets(arr(ponto.erros)); }

    const integ = arr(pb.integracoes)[0] as Integracao | undefined;
    if (integ) {
      h2(`Peça 2 — ${s(integ.titulo, 120)}`);
      if (integ.quando) text(`Quando fazer: ${s(integ.quando, 400)}`, { color: muted });
      if (integ.precisaChaveApi) { nl(0.2); text('Precisa de chave de API — trate como senha e revogue se vazar.', { color: muted }); }
      nl(0.3);
      passos(arr(integ.passos));
      if (integ.resultado) { nl(0.2); text(`Resultado: ${s(integ.resultado, 400)}`, { font: bold }); }
    }

    const alt = arr(pb.alternativas)[0] as Ferramenta | undefined;
    if (alt) { h2('Alternativa'); text(`${s(alt.nome, 60)} — ${s(alt.oQueResolve, 400)} (${s(alt.precoBRL, 200)})`); text(s(alt.url, 200), { size: 9, color: muted }); }

    h2('Checklist');
    bullets(arr(pb.checklist));
  }

  if (pb.notaFerramentasGerais) { h2('IA de uso geral'); text(s(pb.notaFerramentasGerais, 800)); }

  // ===== Rodapé na última página =====
  const last = pdf.getPages()[pdf.getPages().length - 1];
  last.drawLine({ start: { x: M, y: 54 }, end: { x: W - M, y: 54 }, thickness: 1, color: rule });
  last.drawText('Focus Indica · focusinteligente.com.br', { x: M, y: 38, size: 9, font: bold, color: brand });
  last.drawText('As ferramentas resolvem a maior parte; a integração e a manutenção é onde a maioria trava.', {
    x: M, y: 24, size: 8, font, color: muted,
  });

  return await pdf.save();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const json = (p: unknown, status = 200) =>
    new Response(JSON.stringify(p), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  try {
    const body = await req.json().catch(() => ({}));
    const { session_id, playbook, email } = body ?? {};
    if (!isUuid(session_id)) return json({ error: 'invalid_session_id' }, 400);
    if (!playbook || typeof playbook !== 'object') return json({ error: 'missing_playbook' }, 400);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: session } = await supabase
      .from('diagnostico_sessions').select('id').eq('id', session_id).maybeSingle();
    if (!session) return json({ error: 'session_not_found' }, 404);

    const bytes = await gerarPdf(playbook as Playbook);
    const path = `${session_id}/playbook-${Date.now()}.pdf`;
    const up = await supabase.storage.from('diagnosticos-pdf')
      .upload(path, bytes, { contentType: 'application/pdf', upsert: true });
    if (up.error) throw up.error;

    const nomeArquivo = `playbook-${String((playbook as Playbook).categoria || 'diagnostico')}.pdf`;
    const signed = await supabase.storage.from('diagnosticos-pdf')
      .createSignedUrl(path, 60 * 60 * 24 * 30, { download: nomeArquivo });
    if (signed.error) throw signed.error;

    let emailStatus: 'skipped' | 'sent' | 'failed' = 'skipped';
    if (typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const r = await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'diagnostico-resultado',
          recipientEmail: email,
          idempotencyKey: `playbook-${session_id}`,
          templateData: {
            categoria: CAT_LABEL[String((playbook as Playbook).categoria)] ?? '',
            downloadUrl: signed.data.signedUrl,
          },
        },
      });
      emailStatus = r.error ? 'failed' : 'sent';
    }

    return json({ ok: true, url: signed.data.signedUrl, email_status: emailStatus });
  } catch (err) {
    console.error('gerar-playbook-pdf error', err);
    return json({ error: String(err) }, 500);
  }
});
