import { PERFIL_LABEL } from '../engine/recomendacao';
import type { FerramentaPlaybook, IntegracaoPlaybook, PassoPlaybook, Playbook } from './tipos';

const CATEGORIA_LABEL: Record<Playbook['categoria'], string> = {
  atendimento: 'Atendimento',
  vendas: 'Vendas e follow-up',
  operacao: 'Operação',
  financeiro: 'Financeiro',
};

const DIFICULDADE_LABEL: Record<1 | 2 | 3, string> = {
  1: 'Fácil — qualquer pessoa monta',
  2: 'Média — exige atenção, mas dá pra fazer sozinho',
  3: 'Técnica — melhor com ajuda de alguém de tecnologia',
};

function dataBR(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return iso.slice(0, 10);
  }
}

// ---------------------------------------------------------------------------
// MARKDOWN
// ---------------------------------------------------------------------------

function passoMd(p: PassoPlaybook, n: number): string {
  const detalhe = p.detalhe
    .split('\n')
    .map((l) => (l.trim().startsWith('- ') ? `   ${l.trim()}` : `   ${l.trim()}`))
    .join('\n');
  return `${n}. **${p.titulo}**\n${detalhe}`;
}

function ferramentaMd(f: FerramentaPlaybook, titulo: string): string {
  return [
    `## ${titulo}: ${f.nome}`,
    ``,
    `${f.oQueResolve}`,
    ``,
    `- **Dificuldade:** ${DIFICULDADE_LABEL[f.dificuldade]}`,
    `- **Tempo de setup:** ${f.tempoSetup}`,
    `- **Preço:** ${f.precoBRL}`,
    `- **Precisa de cartão pra começar?** ${f.precisaCartao ? 'Sim' : 'Não'}`,
    `- **Link:** ${f.url}`,
    ``,
    `### Antes de começar`,
    ...f.requisitos.map((r) => `- ${r}`),
    ``,
    `### Passo a passo`,
    ...f.passos.map((p, i) => passoMd(p, i + 1)),
    ``,
    `### Como saber que funcionou`,
    f.primeiroTeste,
    ``,
    `### Erros comuns nesse setup`,
    ...f.erros.map((e) => `- ${e}`),
  ].join('\n');
}

function integracaoMd(i: IntegracaoPlaybook): string {
  return [
    `### ${i.titulo}`,
    ``,
    `**Quando fazer:** ${i.quando}`,
    ``,
    i.precisaChaveApi ? `> Precisa de chave de API. Trate como senha: não compartilhe, e revogue se vazar.` : ``,
    ``,
    ...i.passos.map((p, idx) => passoMd(p, idx + 1)),
    ``,
    `**Resultado:** ${i.resultado}`,
  ]
    .filter((l) => l !== null && l !== undefined)
    .join('\n');
}

export function playbookToMarkdown(pb: Playbook): string {
  const partes: string[] = [];

  partes.push(`# Playbook — ${pb.tituloResultado}`);
  partes.push('');
  partes.push(
    `**Perfil:** ${PERFIL_LABEL[pb.perfil]} · **Frente:** ${CATEGORIA_LABEL[pb.categoria]} · **Gerado em:** ${dataBR(pb.geradoEm)}`,
  );
  partes.push('');
  partes.push('---');
  partes.push('');
  partes.push(pb.resumo);
  partes.push('');
  partes.push(ferramentaMd(pb.pontoDePartida, 'Seu ponto de partida'));
  partes.push('');

  if (pb.integracoes.length) {
    partes.push('---');
    partes.push('');
    partes.push('# Conecte com o que você já usa');
    partes.push('');
    partes.push(
      'Uma ferramenta sozinha resolve pouco. Aqui está como ligar o ponto de partida ao resto — por integração nativa, Make/Zapier, API ou MCP.',
    );
    partes.push('');
    pb.integracoes.forEach((i) => {
      partes.push(integracaoMd(i));
      partes.push('');
    });
  }

  if (pb.alternativas.length) {
    partes.push('---');
    partes.push('');
    partes.push('# Alternativas ao ponto de partida');
    partes.push('');
    pb.alternativas.forEach((a) => {
      partes.push(`- **${a.nome}** — ${a.oQueResolve} _(${a.precoBRL})_ · ${a.url}`);
    });
    partes.push('');
  }

  partes.push('---');
  partes.push('');
  partes.push('# Quando evoluir');
  partes.push('');
  pb.quandoEvoluir.forEach((q) => partes.push(`- ${q}`));
  partes.push('');

  partes.push('---');
  partes.push('');
  partes.push('# Checklist');
  partes.push('');
  pb.checklist.forEach((c) => partes.push(`- [ ] ${c}`));
  partes.push('');

  partes.push('---');
  partes.push('');
  partes.push('# IA de uso geral');
  partes.push('');
  partes.push(pb.notaFerramentasGerais);
  partes.push('');

  partes.push('---');
  partes.push('');
  partes.push(
    '_Playbook gerado pelo Diagnóstico de Agente de IA da Focus Indica — focusinteligente.com.br. As ferramentas resolvem a maior parte; a integração e a manutenção é onde a maioria trava. Se quiser ajuda nessa parte, a sessão de 30 min é gratuita._',
  );

  return partes.join('\n');
}

// ---------------------------------------------------------------------------
// HTML (documento standalone, tema claro, bom pra ler e imprimir)
// ---------------------------------------------------------------------------

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function detalheHtml(detalhe: string): string {
  const linhas = detalhe.split('\n').map((l) => l.trim()).filter(Boolean);
  const bullets = linhas.filter((l) => l.startsWith('- '));
  if (bullets.length === linhas.length && bullets.length > 0) {
    return `<ul>${bullets.map((b) => `<li>${esc(b.slice(2))}</li>`).join('')}</ul>`;
  }
  return linhas
    .map((l) => (l.startsWith('- ') ? `<ul><li>${esc(l.slice(2))}</li></ul>` : `<p>${esc(l)}</p>`))
    .join('');
}

function passosHtml(passos: PassoPlaybook[]): string {
  return `<ol class="passos">${passos
    .map((p) => `<li><strong>${esc(p.titulo)}</strong>${detalheHtml(p.detalhe)}</li>`)
    .join('')}</ol>`;
}

function ferramentaHtml(f: FerramentaPlaybook, titulo: string): string {
  return `
    <section>
      <h2>${esc(titulo)}: ${esc(f.nome)}</h2>
      <p class="lead">${esc(f.oQueResolve)}</p>
      <table class="ficha">
        <tr><th>Dificuldade</th><td>${esc(DIFICULDADE_LABEL[f.dificuldade])}</td></tr>
        <tr><th>Tempo de setup</th><td>${esc(f.tempoSetup)}</td></tr>
        <tr><th>Preço</th><td>${esc(f.precoBRL)}</td></tr>
        <tr><th>Cartão pra começar?</th><td>${f.precisaCartao ? 'Sim' : 'Não'}</td></tr>
        <tr><th>Link</th><td><a href="${esc(f.url)}">${esc(f.url)}</a></td></tr>
      </table>
      <h3>Antes de começar</h3>
      <ul>${f.requisitos.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
      <h3>Passo a passo</h3>
      ${passosHtml(f.passos)}
      <h3>Como saber que funcionou</h3>
      <p>${esc(f.primeiroTeste)}</p>
      <h3>Erros comuns nesse setup</h3>
      <ul>${f.erros.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
    </section>`;
}

function integracaoHtml(i: IntegracaoPlaybook): string {
  return `
    <section class="integracao">
      <h3>${esc(i.titulo)}</h3>
      <p><strong>Quando fazer:</strong> ${esc(i.quando)}</p>
      ${i.precisaChaveApi ? `<p class="aviso">Precisa de chave de API. Trate como senha: não compartilhe e revogue se vazar.</p>` : ''}
      ${passosHtml(i.passos)}
      <p class="resultado"><strong>Resultado:</strong> ${esc(i.resultado)}</p>
    </section>`;
}

export function playbookToHTML(pb: Playbook): string {
  const alternativas = pb.alternativas.length
    ? `<section>
        <h2>Alternativas ao ponto de partida</h2>
        <ul>${pb.alternativas
          .map(
            (a) =>
              `<li><strong>${esc(a.nome)}</strong> — ${esc(a.oQueResolve)} <em>(${esc(a.precoBRL)})</em> · <a href="${esc(a.url)}">${esc(a.url)}</a></li>`,
          )
          .join('')}</ul>
      </section>`
    : '';

  const integracoes = pb.integracoes.length
    ? `<section>
        <h2>Conecte com o que você já usa</h2>
        <p>Uma ferramenta sozinha resolve pouco. Aqui está como ligar o ponto de partida ao resto — por integração nativa, Make/Zapier, API ou MCP.</p>
        ${pb.integracoes.map(integracaoHtml).join('')}
      </section>`
    : '';

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Playbook — ${esc(pb.tituloResultado)}</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1a1a2e; background: #fff; line-height: 1.6;
    max-width: 780px; margin: 0 auto; padding: 48px 24px 80px;
  }
  h1 { font-size: 1.9rem; line-height: 1.2; margin: 0 0 8px; }
  h2 { font-size: 1.35rem; margin: 40px 0 12px; padding-top: 20px; border-top: 2px solid #ececf5; }
  h3 { font-size: 1.05rem; margin: 24px 0 8px; color: #3730a3; }
  p { margin: 10px 0; }
  a { color: #4f46e5; word-break: break-word; }
  .meta { color: #6b7280; font-size: 0.9rem; margin-bottom: 24px; }
  .resumo { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 16px 18px; }
  .lead { font-size: 1.05rem; color: #374151; }
  table.ficha { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 0.95rem; }
  table.ficha th, table.ficha td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #ececf5; vertical-align: top; }
  table.ficha th { width: 190px; color: #6b7280; font-weight: 600; }
  ol.passos { padding-left: 20px; }
  ol.passos > li { margin: 14px 0; }
  ol.passos > li > strong { display: block; margin-bottom: 2px; }
  ul { padding-left: 20px; }
  li { margin: 4px 0; }
  .integracao { background: #fafafe; border: 1px solid #ececf5; border-radius: 12px; padding: 4px 18px 16px; margin: 16px 0; }
  .integracao h3 { margin-top: 16px; }
  .aviso { background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 8px 12px; font-size: 0.9rem; }
  .resultado { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 8px 12px; }
  .checklist { list-style: none; padding-left: 0; }
  .checklist li::before { content: "☐"; margin-right: 8px; color: #4f46e5; }
  footer { margin-top: 48px; padding-top: 20px; border-top: 2px solid #ececf5; color: #6b7280; font-size: 0.9rem; }
  @media print { body { padding: 0; } h2 { break-after: avoid; } section { break-inside: avoid-page; } }
</style>
</head>
<body>
  <h1>Playbook — ${esc(pb.tituloResultado)}</h1>
  <p class="meta">Perfil: <strong>${esc(PERFIL_LABEL[pb.perfil])}</strong> · Frente: <strong>${esc(CATEGORIA_LABEL[pb.categoria])}</strong> · Gerado em ${esc(dataBR(pb.geradoEm))}</p>
  <p class="resumo">${esc(pb.resumo)}</p>
  ${ferramentaHtml(pb.pontoDePartida, 'Seu ponto de partida')}
  ${integracoes}
  ${alternativas}
  <section>
    <h2>Quando evoluir</h2>
    <ul>${pb.quandoEvoluir.map((q) => `<li>${esc(q)}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>Checklist</h2>
    <ul class="checklist">${pb.checklist.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>IA de uso geral</h2>
    <p>${esc(pb.notaFerramentasGerais)}</p>
  </section>
  <footer>
    Playbook gerado pelo Diagnóstico de Agente de IA da <strong>Focus Indica</strong> — <a href="https://focusinteligente.com.br">focusinteligente.com.br</a>.<br />
    As ferramentas resolvem a maior parte; a integração e a manutenção é onde a maioria trava. Se quiser ajuda nessa parte, a sessão de 30 minutos é gratuita.
  </footer>
</body>
</html>`;
}
