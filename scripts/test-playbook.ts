// Verificação do pipeline de playbook — roda com:
//   node --experimental-strip-types scripts/test-playbook.ts
import { calcularResultado } from '../src/features/diagnostico/engine/recomendacao.ts';
import { montarPlaybook, playbookToMarkdown, playbookToHTML } from '../src/features/diagnostico/playbooks/index.ts';

const cenarios: Array<{ nome: string; respostas: Record<number, string> }> = [
  {
    nome: 'Consultor · atendimento · já usa ChatGPT + CRM',
    respostas: {
      1: 'Consultor — presto serviço recorrente pra alguns clientes',
      2: 'Atendimento ao cliente — demoro para responder, perco gente no caminho',
      3: '2 a 5 pessoas',
      4: 'Entre 10 e 50',
      5: 'responder no whatsapp as mesmas duvidas de clientes sobre prazo e escopo',
      6: 'eu focaria em vender e entregar em vez de responder mensagem o dia todo',
      7: 'ChatGPT, Gemini ou Claude no dia a dia; Um CRM (RD Station, Pipedrive, HubSpot, Kommo...)',
    },
  },
  {
    nome: 'Autônomo · atendimento · começa do zero',
    respostas: {
      1: 'Autônomo ou freelancer — sou eu que faço e entrego',
      2: 'Atendimento ao cliente — demoro para responder, perco gente no caminho',
      3: 'Só eu',
      4: 'Menos de 10',
      5: 'responder dm no instagram',
      6: 'ter mais tempo livre',
      7: 'Nada ainda — seria minha primeira vez',
    },
  },
  {
    nome: 'Empresa · financeiro · já usa automação',
    respostas: {
      1: 'Empresa com time — operação interna com funcionários',
      2: 'Financeiro — não sei prever caixa, cobrança de cliente é manual',
      3: '6 a 20 pessoas',
      4: 'Menos de 10',
      5: 'cobrar cliente inadimplente na mão todo mês',
      6: 'previsibilidade de caixa',
      7: 'Automação (Make, Zapier, n8n); Planilhas (Google Sheets / Excel) pra controlar processo',
    },
  },
];

let falhas = 0;
function check(cond: boolean, msg: string) {
  if (!cond) { falhas++; console.log('  ✗ ' + msg); } else { console.log('  ✓ ' + msg); }
}

for (const c of cenarios) {
  console.log('\n=== ' + c.nome + ' ===');
  const resultado = calcularResultado(c.respostas);
  console.log(`perfil=${resultado.perfil} categoria=${resultado.categoria} confianca=${resultado.confianca}`);
  console.log(`jaUsa=[${resultado.jaUsa.join(' | ')}] titulo="${resultado.titulo}"`);

  const pb = montarPlaybook(resultado, c.respostas[5]);
  check(!!pb.pontoDePartida?.nome, `ponto de partida: ${pb.pontoDePartida?.nome}`);
  check(pb.pontoDePartida.passos.length >= 3, `ponto de partida tem ${pb.pontoDePartida.passos.length} passos`);
  check(pb.integracoes.length >= 1, `${pb.integracoes.length} integrações: ${pb.integracoes.map((i) => i.id).join(', ')}`);
  check(pb.checklist.length >= 4, `checklist com ${pb.checklist.length} itens`);
  check(pb.quandoEvoluir.length >= 1, `quandoEvoluir com ${pb.quandoEvoluir.length} itens`);

  const md = playbookToMarkdown(pb);
  const html = playbookToHTML(pb);
  check(md.startsWith('# Playbook'), 'markdown começa com título');
  check(md.includes(pb.pontoDePartida.nome), 'markdown cita a ferramenta de partida');
  check(md.includes('Passo a passo'), 'markdown tem seção de passos');
  check(html.startsWith('<!doctype html>'), 'html é documento completo');
  check(html.includes('<title>'), 'html tem <title>');
  check(!html.includes('undefined'), 'html não tem "undefined"');
  check(!md.includes('undefined'), 'markdown não tem "undefined"');

  // amostra
  if (c === cenarios[0]) {
    console.log('\n--- amostra Markdown (cenário 1, primeiras 60 linhas) ---');
    console.log(md.split('\n').slice(0, 60).join('\n'));
  }
}

console.log('\n' + (falhas === 0 ? '✅ TODOS OS CHECKS PASSARAM' : `❌ ${falhas} CHECK(S) FALHARAM`));
process.exit(falhas === 0 ? 0 : 1);
