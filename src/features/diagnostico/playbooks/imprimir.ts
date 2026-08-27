import { PERFIL_LABEL } from '../engine/recomendacao';
import type { FerramentaPlaybook, IntegracaoPlaybook, PassoPlaybook, Playbook } from './tipos';

// Fallback client-side do playbook: HTML estilizado pra imprimir/salvar como PDF
// quando a edge function `gerar-playbook-pdf` não estiver disponível.

const CATEGORIA_LABEL: Record<Playbook['categoria'], string> = {
  atendimento: 'Atendimento',
  vendas: 'Vendas e follow-up',
  operacao: 'Operação',
  financeiro: 'Financeiro',
};
const DIF = ['', 'Fácil — qualquer pessoa monta', 'Média — dá pra fazer sozinho com atenção', 'Técnica — melhor com ajuda de tecnologia'];

function esc(s: string): string {
  return (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function detalhe(d: string): string {
  const linhas = (d ?? '').split('\n').map((l) => l.trim()).filter(Boolean);
  const bullets = linhas.filter((l) => l.startsWith('- '));
  if (bullets.length && bullets.length === linhas.length) {
    return `<ul>${bullets.map((b) => `<li>${esc(b.slice(2))}</li>`).join('')}</ul>`;
  }
  return linhas.map((l) => `<p>${esc(l)}</p>`).join('');
}
function passos(list: PassoPlaybook[]): string {
  return `<ol class="passos">${list.map((p) => `<li><strong>${esc(p.titulo)}</strong>${detalhe(p.detalhe)}</li>`).join('')}</ol>`;
}
function ul(items: string[]): string {
  return `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
}
function ferramenta(f: FerramentaPlaybook, titulo: string): string {
  return `
    <section>
      <h2>${esc(titulo)}: ${esc(f.nome)}</h2>
      <p class="lead">${esc(f.oQueResolve)}</p>
      <table class="ficha">
        <tr><th>Dificuldade</th><td>${esc(DIF[f.dificuldade] ?? '')}</td></tr>
        <tr><th>Tempo de setup</th><td>${esc(f.tempoSetup)}</td></tr>
        <tr><th>Preço</th><td>${esc(f.precoBRL)}</td></tr>
        <tr><th>Link</th><td><a href="${esc(f.url)}">${esc(f.url)}</a></td></tr>
      </table>
      <h3>Antes de começar</h3>${ul(f.requisitos)}
      <h3>Passo a passo</h3>${passos(f.passos)}
      <h3>Como saber que funcionou</h3><p>${esc(f.primeiroTeste)}</p>
      <h3>Erros comuns</h3>${ul(f.erros)}
    </section>`;
}
function integracao(i: IntegracaoPlaybook): string {
  return `
    <section class="integ">
      <h3>${esc(i.titulo)}</h3>
      <p><strong>Quando fazer:</strong> ${esc(i.quando)}</p>
      ${i.precisaChaveApi ? '<p class="aviso">Precisa de chave de API — trate como senha e revogue se vazar.</p>' : ''}
      ${passos(i.passos)}
      <p class="ok"><strong>Resultado:</strong> ${esc(i.resultado)}</p>
    </section>`;
}

export function playbookParaHtml(pb: Playbook): string {
  const partes: string[] = [];
  partes.push(`<h1>${esc(pb.headline)}</h1>`);
  partes.push(`<p class="meta">Perfil: <strong>${esc(PERFIL_LABEL[pb.perfil])}</strong> · Frente: <strong>${esc(CATEGORIA_LABEL[pb.categoria])}</strong> · Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>`);
  partes.push(`<p class="resumo">${esc(pb.subheadline)}</p>`);
  partes.push(`<p>${esc(pb.resumo)}</p>`);

  if (pb.forma === 'agente') {
    partes.push('<h2>O que um agente resolve no seu caso</h2>' + ul(pb.resumoBullets));
    partes.push('<h2>Como se preparar pra conversa</h2>' + ul(pb.checklist));
    if (pb.quandoEvoluir.length) partes.push('<h2>Contexto — pra onde isso evolui</h2>' + ul(pb.quandoEvoluir));
  } else if (pb.forma === 'validar') {
    partes.push('<h2>Perguntas pra responder antes de escolher ferramenta</h2>' + ul(pb.resumoBullets));
    partes.push('<h2>Enquanto isso</h2><p>Ter o ChatGPT, Claude ou Gemini aberto no dia a dia já resolve boa parte do trabalho manual de texto — comece por um só.</p>');
    partes.push('<h2>Checklist</h2>' + ul(pb.checklist));
  } else {
    partes.push(ferramenta(pb.pontoDePartida, pb.forma === 'ferramenta-mais-complemento' ? 'Peça 1' : 'Seu ponto de partida'));
    if (pb.integracoes[0]) {
      partes.push('<h2>Peça 2 — conecte com o que você já usa</h2>');
      partes.push(integracao(pb.integracoes[0]));
    }
    if (pb.alternativas[0]) {
      const a = pb.alternativas[0];
      partes.push(`<h2>Alternativa</h2><p><strong>${esc(a.nome)}</strong> — ${esc(a.oQueResolve)} <em>(${esc(a.precoBRL)})</em><br><a href="${esc(a.url)}">${esc(a.url)}</a></p>`);
    }
    partes.push('<h2>Checklist</h2>' + ul(pb.checklist));
  }
  partes.push('<h2>IA de uso geral</h2><p>' + esc(pb.notaFerramentasGerais) + '</p>');

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${esc(pb.headline)}</title>
<style>
  :root{color-scheme:light}
  *{box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#1a1a2e;background:#fff;line-height:1.6;max-width:780px;margin:0 auto;padding:40px 24px 80px}
  h1{font-size:1.8rem;line-height:1.2;margin:0 0 6px}
  h2{font-size:1.3rem;margin:36px 0 10px;padding-top:18px;border-top:2px solid #ececf5}
  h3{font-size:1.02rem;margin:20px 0 6px;color:#3730a3}
  a{color:#4f46e5;word-break:break-word}
  .meta{color:#6b7280;font-size:.9rem;margin-bottom:20px}
  .resumo{background:#f5f3ff;border:1px solid #ddd6fe;border-radius:10px;padding:14px 16px}
  .lead{font-size:1.03rem;color:#374151}
  table.ficha{border-collapse:collapse;width:100%;margin:10px 0;font-size:.94rem}
  table.ficha th,table.ficha td{text-align:left;padding:7px 10px;border-bottom:1px solid #ececf5;vertical-align:top}
  table.ficha th{width:150px;color:#6b7280;font-weight:600}
  ol.passos{padding-left:20px} ol.passos>li{margin:12px 0} ol.passos>li>strong{display:block;margin-bottom:2px}
  ul{padding-left:20px} li{margin:4px 0}
  .integ{background:#fafafe;border:1px solid #ececf5;border-radius:10px;padding:2px 16px 14px;margin:12px 0}
  .aviso{background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:7px 11px;font-size:.9rem}
  .ok{background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;padding:7px 11px}
  footer{margin-top:44px;padding-top:18px;border-top:2px solid #ececf5;color:#6b7280;font-size:.88rem}
  @media print{body{padding:0} h2{break-after:avoid} section{break-inside:avoid-page}}
</style></head><body>
${partes.join('\n')}
<footer>Playbook do Diagnóstico de Agente de IA — <strong>Focus Indica</strong> · focusinteligente.com.br<br>
Salve como PDF pelo menu de impressão (Ctrl/Cmd + P → "Salvar como PDF").</footer>
</body></html>`;
}
