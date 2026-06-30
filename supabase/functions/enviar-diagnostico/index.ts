// Edge function: gera o PDF do diagnóstico e envia por e-mail.
// Usa pdf-lib (Deno-compatível) para montar o PDF inline, sobe no Supabase Storage
// e envia o link via send-transactional-email (Lovable Emails).
//
// Payload esperado:
//   { session_id: string; email: string; categoria: string }
//
// Dependências:
//  - bucket `diagnosticos-pdf` (privado)
//  - template transacional `diagnostico-resultado`
//
// Se o envio de e-mail falhar (ex: domínio ainda não verificado), o PDF
// continua salvo em Storage e o erro é registrado, mas a function retorna 200
// para não bloquear UX do usuário (que já viu o resultado na tela).

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { PDFDocument, StandardFonts, rgb } from 'npm:pdf-lib@1.17.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const CATEGORIAS_LABEL: Record<string, string> = {
  atendimento: 'Agente de Atendimento',
  vendas: 'Agente de Vendas',
  operacao: 'Agente de Operação',
  financeiro: 'Agente Financeiro',
};

const CATEGORIAS_DESC: Record<string, string> = {
  atendimento: 'Foco em responder clientes 24/7, qualificar contatos e reduzir tempo de primeira resposta.',
  vendas: 'Foco em follow-up automatizado, lembretes de contato e qualificação de oportunidades.',
  operacao: 'Foco em automatizar processos repetitivos internos e reduzir retrabalho operacional.',
  financeiro: 'Foco em cobrança automática, conciliação e previsibilidade de caixa.',
};

const PERGUNTAS_LABEL: Record<number, string> = {
  1: 'Maior gargalo atual',
  2: 'Tamanho da equipe',
  3: 'Volume diário de contatos',
  4: 'Tarefa que mais consome tempo',
  5: 'Experiência com IA',
  6: 'Como seria o dia a dia ideal',
  7: 'Orçamento mensal disponível',
};

async function gerarPDF(opts: {
  categoria: string;
  respostas: Array<{ pergunta_numero: number; resposta_valor: string }>;
  email: string;
}): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const helvetica = await pdf.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page = pdf.addPage([595, 842]); // A4
  const { width, height } = page.size();

  const brand = rgb(0.145, 0.388, 0.922);     // #2563eb
  const brandDark = rgb(0.114, 0.306, 0.847); // #1d4ed8
  const text = rgb(0.04, 0.10, 0.21);         // #0b1a36
  const muted = rgb(0.29, 0.33, 0.41);
  const cardBg = rgb(0.95, 0.97, 1);

  // ===== Header faixa azul =====
  page.drawRectangle({ x: 0, y: height - 110, width, height: 110, color: brand });
  page.drawRectangle({ x: 0, y: height - 120, width, height: 12, color: brandDark });

  page.drawText('Focus Indica', {
    x: 40, y: height - 55, size: 26, font: helveticaBold, color: rgb(1, 1, 1),
  });
  page.drawText('Seu Diagnóstico de Agente de IA', {
    x: 40, y: height - 85, size: 13, font: helvetica, color: rgb(0.9, 0.95, 1),
  });

  let y = height - 170;

  // ===== Categoria recomendada =====
  page.drawText('CATEGORIA RECOMENDADA', {
    x: 40, y, size: 9, font: helveticaBold, color: muted,
  });
  y -= 18;
  page.drawText(CATEGORIAS_LABEL[opts.categoria] ?? opts.categoria, {
    x: 40, y, size: 22, font: helveticaBold, color: brand,
  });
  y -= 22;

  // descrição (quebra simples)
  const desc = CATEGORIAS_DESC[opts.categoria] ?? '';
  const descLines = wrapText(desc, 85);
  for (const line of descLines) {
    page.drawText(line, { x: 40, y, size: 11, font: helvetica, color: text });
    y -= 16;
  }

  y -= 18;
  // separador
  page.drawRectangle({ x: 40, y, width: width - 80, height: 1, color: rgb(0.85, 0.88, 0.95) });
  y -= 24;

  // ===== Suas respostas =====
  page.drawText('SUAS RESPOSTAS', {
    x: 40, y, size: 9, font: helveticaBold, color: muted,
  });
  y -= 22;

  const respostasOrdenadas = [...opts.respostas].sort((a, b) => a.pergunta_numero - b.pergunta_numero);
  for (const r of respostasOrdenadas) {
    if (y < 100) {
      page = pdf.addPage([595, 842]);
      y = page.size().height - 60;
    }
    const label = PERGUNTAS_LABEL[r.pergunta_numero] ?? `Pergunta ${r.pergunta_numero}`;
    page.drawRectangle({
      x: 40, y: y - 8, width: width - 80, height: 4, color: cardBg,
    });
    page.drawText(`${r.pergunta_numero}. ${label}`, {
      x: 40, y, size: 11, font: helveticaBold, color: brand,
    });
    y -= 16;
    const respostaLines = wrapText(r.resposta_valor, 85);
    for (const line of respostaLines) {
      if (y < 60) {
        page = pdf.addPage([595, 842]);
        y = page.size().height - 60;
      }
      page.drawText(line, { x: 40, y, size: 10.5, font: helvetica, color: text });
      y -= 14;
    }
    y -= 12;
  }

  // ===== Rodapé =====
  const lastPage = pdf.getPages()[pdf.getPages().length - 1];
  lastPage.drawRectangle({ x: 0, y: 0, width, height: 40, color: brand });
  lastPage.drawText('Focus Indica · focusinteligente.com.br', {
    x: 40, y: 15, size: 10, font: helveticaBold, color: rgb(1, 1, 1),
  });
  lastPage.drawText(`Enviado para ${opts.email}`, {
    x: width - 220, y: 15, size: 9, font: helvetica, color: rgb(0.9, 0.95, 1),
  });

  return await pdf.save();
}

function wrapText(s: string, maxChars: number): string[] {
  const words = (s ?? '').split(/\s+/);
  const out: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars) {
      if (line) out.push(line);
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) out.push(line);
  return out.length ? out : [''];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { session_id, email, categoria } = await req.json();
    if (!session_id || !email || !categoria) {
      return new Response(JSON.stringify({ error: 'missing_fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // 1. Carrega respostas
    const { data: respostas, error: respErr } = await supabase
      .from('diagnostico_respostas')
      .select('pergunta_numero, resposta_valor')
      .eq('session_id', session_id);
    if (respErr) throw respErr;

    // 2. Gera PDF
    const pdfBytes = await gerarPDF({
      categoria,
      respostas: respostas ?? [],
      email,
    });

    // 3. Upload no Storage
    const path = `${session_id}/diagnostico-${Date.now()}.pdf`;
    const upload = await supabase.storage
      .from('diagnosticos-pdf')
      .upload(path, pdfBytes, { contentType: 'application/pdf', upsert: true });
    if (upload.error) throw upload.error;

    // 4. URL assinada válida por 7 dias
    const { data: signed, error: signErr } = await supabase.storage
      .from('diagnosticos-pdf')
      .createSignedUrl(path, 60 * 60 * 24 * 7);
    if (signErr) throw signErr;

    // 5. Envia e-mail (tolerante a falhas)
    const sendResult = await supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'diagnostico-resultado',
        recipientEmail: email,
        idempotencyKey: `diagnostico-${session_id}`,
        templateData: {
          categoria: CATEGORIAS_LABEL[categoria] ?? categoria,
          downloadUrl: signed.signedUrl,
        },
      },
    });

    return new Response(JSON.stringify({
      ok: true,
      pdf_url: signed.signedUrl,
      email_status: sendResult.error ? 'failed' : 'sent',
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('enviar-diagnostico error', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
