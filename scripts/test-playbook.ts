// Verificação do motor: forma da recomendação + montarPlaybook.
//   node --experimental-strip-types scripts/test-playbook.ts  (ou via esbuild bundle)
import { calcularResultado } from '../src/features/diagnostico/engine/recomendacao.ts';
import { montarPlaybook } from '../src/features/diagnostico/playbooks/index.ts';

interface Cenario {
  nome: string;
  respostas: Record<number, string>;
  formaEsperada: string;
  /** id da ferramenta esperada como ponto de partida (opcional) */
  toolEsperada?: string;
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
    nome: 'Autônomo · atendimento · WhatsApp · não usa nada → uma-ferramenta / Typebot',
    formaEsperada: 'uma-ferramenta', toolEsperada: 'typebot',
    respostas: {
      1: P1.autonomo, 2: GARGALO.atendimento, 3: 'Só eu', 4: 'Menos de 10',
      5: 'responder as mesmas duvidas no whatsapp', 6: 'ter mais tempo',
      7: 'Nada ainda — seria minha primeira vez',
    },
  },
  {
    nome: 'Autônomo · atendimento · Instagram → uma-ferramenta / ManyChat',
    formaEsperada: 'uma-ferramenta', toolEsperada: 'manychat',
    respostas: {
      1: P1.autonomo, 2: GARGALO.atendimento, 3: 'Só eu', 4: 'Menos de 10',
      5: 'respondo dm e comentario no instagram o dia todo', 6: 'menos tempo no celular',
      7: 'Nada ainda — seria minha primeira vez',
    },
  },
  {
    nome: 'Consultor · VENDAS · "e-mails automáticos" → uma-ferramenta / Brevo (era Kommo!)',
    formaEsperada: 'uma-ferramenta', toolEsperada: 'brevo',
    respostas: {
      1: P1.consultor, 2: GARGALO.vendas, 3: 'Só eu', 4: 'Menos de 10',
      5: 'mandar os mesmos e-mails de acompanhamento pra cada lead novo', 6: 'Passaria a enviar e-mails automáticos',
      7: 'Nada ainda — seria minha primeira vez',
    },
  },
  {
    nome: 'Consultor · vendas · "proposta" → uma-ferramenta / IA proposta',
    formaEsperada: 'uma-ferramenta', toolEsperada: 'ia-proposta',
    respostas: {
      1: P1.consultor, 2: GARGALO.vendas, 3: 'Só eu', 4: 'Menos de 10',
      5: 'monto proposta comercial do zero pra cada cliente', 6: 'fechar mais rapido',
      7: 'Nada ainda — seria minha primeira vez',
    },
  },
  {
    nome: 'Empresa · operação · "relatório toda semana" → uma-ferramenta / IA documento',
    formaEsperada: 'uma-ferramenta', toolEsperada: 'ia-documento',
    respostas: {
      1: P1.empresa, 2: GARGALO.operacao, 3: '2 a 5 pessoas', 4: 'Menos de 10',
      5: 'monto o mesmo relatorio executivo toda semana na mao', 6: 'sair do operacional',
      7: 'Nada ainda — seria minha primeira vez',
    },
  },
  {
    nome: 'Autônomo · financeiro · "mensalidade" → uma-ferramenta / Vindi',
    formaEsperada: 'uma-ferramenta', toolEsperada: 'vindi',
    respostas: {
      1: P1.autonomo, 2: GARGALO.financeiro, 3: 'Só eu', 4: 'Menos de 10',
      5: 'cobrar a mensalidade da assinatura de cada aluno', 6: 'previsibilidade',
      7: 'Nada ainda — seria minha primeira vez',
    },
  },
  {
    nome: 'Consultor · vendas · e-mail + já usa CRM → ferramenta-mais-complemento / Brevo',
    formaEsperada: 'ferramenta-mais-complemento', toolEsperada: 'brevo',
    respostas: {
      1: P1.consultor, 2: GARGALO.vendas, 3: '2 a 5 pessoas', 4: 'Entre 10 e 50',
      5: 'sequencia de e-mail pra lead que entrou no funil', 6: 'nutrir sem trabalho manual',
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
  console.log(`ponto de partida: ${pb.pontoDePartida.id} (${pb.pontoDePartida.nome})`);
  if (c.toolEsperada) {
    check(pb.pontoDePartida.id === c.toolEsperada, `ferramenta esperada: ${c.toolEsperada} (obtida: ${pb.pontoDePartida.id})`);
  }
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
