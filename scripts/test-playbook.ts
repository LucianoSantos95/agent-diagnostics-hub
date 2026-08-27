// Verificação do motor: forma da recomendação + montarPlaybook.
//   node --experimental-strip-types scripts/test-playbook.ts  (ou via esbuild bundle)
import { calcularResultado } from '../src/features/diagnostico/engine/recomendacao.ts';
import { montarPlaybook } from '../src/features/diagnostico/playbooks/index.ts';

interface Cenario {
  nome: string;
  respostas: Record<number, string>;
  formaEsperada: string;
}

const P1 = {
  autonomo: 'Autônomo ou freelancer — sou eu que faço e entrego',
  consultor: 'Consultor — presto serviço recorrente pra alguns clientes',
  empresa: 'Empresa com time — operação interna com funcionários',
};
const GARGALO = {
  atendimento: 'Atendimento ao cliente — demoro para responder, perco gente no caminho',
  vendas: 'Vendas e follow-up — esqueço de cobrar resposta, perco oportunidade',
  operacao: 'Operação interna — processo manual, retrabalho, tarefa repetitiva',
  financeiro: 'Financeiro — não sei prever caixa, cobrança de cliente é manual',
};

const cenarios: Cenario[] = [
  {
    nome: 'Autônomo · atendimento · não usa nada → uma-ferramenta',
    formaEsperada: 'uma-ferramenta',
    respostas: {
      1: P1.autonomo, 2: GARGALO.atendimento, 3: 'Só eu', 4: 'Menos de 10',
      5: 'responder as mesmas duvidas no whatsapp', 6: 'ter mais tempo',
      7: 'Nada ainda — seria minha primeira vez',
    },
  },
  {
    nome: 'Consultor · atendimento · já usa CRM → ferramenta-mais-complemento',
    formaEsperada: 'ferramenta-mais-complemento',
    respostas: {
      1: P1.consultor, 2: GARGALO.atendimento, 3: '2 a 5 pessoas', 4: 'Entre 10 e 50',
      5: 'responder duvidas de prazo no whatsapp', 6: 'focar em vender',
      7: 'Um CRM (RD Station, Pipedrive, HubSpot, Kommo...)',
    },
  },
  {
    nome: 'Empresa · atendimento · já usa chatbot → agente',
    formaEsperada: 'agente',
    respostas: {
      1: P1.empresa, 2: GARGALO.atendimento, 3: '6 a 20 pessoas', 4: 'Entre 10 e 50',
      5: 'bot atual nao da conta das duvidas mais complexas', 6: 'menos fila',
      7: 'Chatbot ou atendimento (ManyChat, Typebot, Tidio...)',
    },
  },
  {
    nome: 'Empresa · vendas · time grande + volume alto → agente',
    formaEsperada: 'agente',
    respostas: {
      1: P1.empresa, 2: GARGALO.vendas, 3: 'Mais de 20 pessoas', 4: 'Mais de 50',
      5: 'follow up de proposta some no meio do funil', 6: 'previsibilidade',
      7: 'Planilhas (Google Sheets / Excel) pra controlar processo',
    },
  },
  {
    nome: 'Autônomo · financeiro · gargalo x tarefa conflitam → validar',
    formaEsperada: 'validar',
    respostas: {
      1: P1.autonomo, 2: GARGALO.financeiro, 3: 'Só eu', 4: 'Menos de 10',
      5: 'responder cliente no instagram o dia todo', 6: 'sei la',
      7: 'Nada ainda — seria minha primeira vez',
    },
  },
];

let falhas = 0;
const check = (cond: boolean, msg: string) => {
  console.log((cond ? '  ✓ ' : '  ✗ ') + msg);
  if (!cond) falhas++;
};

for (const c of cenarios) {
  console.log('\n=== ' + c.nome + ' ===');
  const r = calcularResultado(c.respostas);
  console.log(`forma=${r.forma} categoria=${r.categoria} confianca=${r.confianca} complemento="${r.complementoLabel}"`);
  check(r.forma === c.formaEsperada, `forma esperada: ${c.formaEsperada} (obtida: ${r.forma})`);

  const pb = montarPlaybook(r, c.respostas[5]);
  check(!!pb.headline && !pb.headline.includes('undefined'), `headline: "${pb.headline}"`);
  check(!!pb.subheadline && !pb.subheadline.includes('undefined'), `subheadline: "${pb.subheadline.slice(0, 70)}…"`);
  check(pb.resumoBullets.length >= 2 && pb.resumoBullets.every((b) => b && !b.includes('undefined')), `${pb.resumoBullets.length} bullets ok`);
  check(pb.checklist.length >= 3, `checklist com ${pb.checklist.length} itens`);

  if (pb.forma === 'ferramenta-mais-complemento') {
    check(pb.integracoes.length === 1, 'exatamente 1 integração');
    check(!!pb.complementoLabel, `complementoLabel: "${pb.complementoLabel}"`);
  } else {
    check(pb.integracoes.length === 0, 'sem integrações');
  }
  if (pb.forma === 'agente' || pb.forma === 'validar') {
    check(pb.alternativas.length === 0, 'sem alternativas');
  }
}

console.log('\n' + (falhas === 0 ? '✅ TODOS OS CHECKS PASSARAM' : `❌ ${falhas} CHECK(S) FALHARAM`));
process.exit(falhas === 0 ? 0 : 1);
