import type { Categoria, Perfil, ResultadoDiagnostico } from '../engine/recomendacao';
import { FERRAMENTAS, integracoesDaCategoria } from './catalogo';
import type { FerramentaPlaybook, IntegracaoPlaybook, Playbook } from './tipos';

// Palavras que identificam, na resposta "o que já usa", grupos de ferramenta.
const SINAL_JA_USA = {
  crm: /crm|rd station|pipedrive|hubspot|kommo/i,
  automacao: /make|zapier|n8n|automa[çc]/i,
  iaGeral: /chatgpt|gemini|claude|copilot/i,
  planilha: /planilha|sheets|excel/i,
  chatbot: /chatbot|manychat|typebot|tidio|atendimento/i,
  cobranca: /asaas|cora|vindi|cobran[çc]/i,
};

function usa(jaUsa: string[], chave: keyof typeof SINAL_JA_USA): boolean {
  return jaUsa.some((s) => SINAL_JA_USA[chave].test(s));
}

// Ferramenta-âncora (1ª escolha natural) por frente.
const ANCORA: Record<Categoria, string> = {
  atendimento: 'typebot',
  vendas: 'kommo',
  operacao: 'make',
  financeiro: 'asaas',
};

// Sinais de canal na descrição livre da tarefa (P5).
function bonusCanal(id: string, tarefa: string): number {
  const t = tarefa.toLowerCase();
  if (id === 'typebot' && /whats?app|whats/.test(t)) return 3;
  if (id === 'manychat' && /instagram|\bdm\b|direct|messenger/.test(t)) return 3;
  if (id === 'tidio' && /site|website|chat no site|p[aá]gina/.test(t)) return 3;
  return 0;
}

function rankFerramentas(
  cands: FerramentaPlaybook[],
  perfil: Perfil,
  categoria: Categoria,
  tarefa: string,
): FerramentaPlaybook[] {
  const score = (f: FerramentaPlaybook) =>
    (f.perfis.includes(perfil) ? 2 : 0) -
    f.dificuldade +
    (f.id === ANCORA[categoria] ? 1.5 : 0) +
    bonusCanal(f.id, tarefa);
  return [...cands].sort((a, b) => score(b) - score(a));
}

function ordenarIntegracoes(
  integracoes: IntegracaoPlaybook[],
  jaUsa: string[],
): IntegracaoPlaybook[] {
  const score = (i: IntegracaoPlaybook) => {
    let s = 0;
    if (i.via === 'nativo') s += 1; // mais fácil primeiro, se nada mais pontuar
    if (usa(jaUsa, 'crm') && /crm/i.test(i.titulo)) s += 5;
    if (usa(jaUsa, 'automacao') && (i.via === 'make' || i.via === 'zapier' || i.via === 'n8n')) s += 5;
    if (usa(jaUsa, 'iaGeral') && (i.via === 'api' || i.via === 'mcp')) s += 4;
    if (usa(jaUsa, 'planilha') && /planilha|sheets/i.test(i.titulo)) s += 3;
    return s;
  };
  return [...integracoes].sort((a, b) => score(b) - score(a));
}

const RESUMO_PERFIL: Record<Perfil, (cat: string) => string> = {
  autonomo: (cat) =>
    `Você toca tudo sozinho, então a régua aqui é: montar rápido, custo baixo e nada que precise de manutenção constante. Este playbook cobre ${cat} com ferramenta de plano gratuito primeiro — só migra pra pago quando o volume justificar.`,
  consultor: (cat) =>
    `Como consultor, você repete o mesmo tipo de entrega pra clientes diferentes. Este playbook de ${cat} serve tanto pra sua operação quanto como base pra você implantar no cliente — as etapas são as mesmas.`,
  agencia: (cat) =>
    `Numa agência, o ganho é multiplicar: o que funcionar em ${cat} pra um cliente vira template pros próximos. Este playbook prioriza ferramentas que escalam por cliente sem virar caos de licença.`,
  empresa: (cat) =>
    `Com um time interno, o gargalo de ${cat} custa em folha e em ritmo. Este playbook começa pelo caso de uso mais repetido e deixa a integração com o que você já roda pro segundo passo.`,
};

const EVOLUIR: Record<Categoria, string[]> = {
  atendimento: [
    'Quando passar de ~50 contatos/dia: migre pro plano pago e conecte a WhatsApp Cloud API oficial da Meta (número dedicado).',
    'Quando tiver mais de uma pessoa atendendo: troque o fluxo solto por um inbox compartilhado (ex.: Chatwoot) pra ninguém responder em duplicidade.',
    'Quando o bot escalar pra humano com muita frequência: aí sim vale desenhar um agente sob medida pro seu caso — não antes.',
  ],
  vendas: [
    'Quando a sequência de follow-up estiver rodando: adicione lead scoring (classificar quente/morno/frio) antes de aumentar volume.',
    'Quando o funil tiver mais de um vendedor: padronize os campos obrigatórios por etapa pra o relatório fechar.',
    'Quando propostas repetirem estrutura: monte um gerador de proposta com IA a partir do contexto do CRM.',
  ],
  operacao: [
    'Quando tiver 3+ automações no ar: centralize o tratamento de erro (uma notificação única quando qualquer cenário falha).',
    'Quando a planilha virar fonte de verdade de muita coisa: migre pra um banco leve (Airtable/Baserow).',
    'Quando as automações começarem a "decidir" (e não só mover dado): leve a lógica pra uma API com IA no meio.',
  ],
  financeiro: [
    'Quando a régua de cobrança estiver estável: conecte os recebimentos à sua planilha/CRM pra conciliação automática.',
    'Quando quiser previsão de caixa: monte um painel (Looker Studio) puxando do extrato + contas a pagar.',
    'Quando o volume de notas crescer: integre emissão de NF ao fluxo de cobrança.',
  ],
};

function montarChecklist(
  ponto: FerramentaPlaybook,
  integracoes: IntegracaoPlaybook[],
): string[] {
  const base = [
    `Escolhi ${ponto.nome} como ponto de partida e criei a conta`,
    ...ponto.passos.slice(0, 3).map((p) => p.titulo),
    ponto.primeiroTeste ? `Fiz o primeiro teste: ${ponto.primeiroTeste.split('.')[0]}` : 'Testei como se fosse um cliente',
  ];
  const integ = integracoes.slice(0, 2).map((i) => `Montei a integração: ${i.titulo}`);
  return [...base, ...integ];
}

/**
 * Monta o playbook personalizado a partir do resultado do diagnóstico.
 * `tarefaLivre` é a resposta P5 (texto) — usada só pra afinar o ponto de partida.
 * Puro — sem I/O. Serve pros renderizadores (Markdown/HTML).
 */
export function montarPlaybook(resultado: ResultadoDiagnostico, tarefaLivre = ''): Playbook {
  const { categoria, perfil, jaUsa } = resultado;

  const candidatas = FERRAMENTAS.filter((f) => f.categorias.includes(categoria));
  const ranqueadas = rankFerramentas(candidatas, perfil, categoria, tarefaLivre);
  const pontoDePartida = ranqueadas[0] ?? FERRAMENTAS[0];
  const alternativas = ranqueadas.slice(1);

  const integracoes = ordenarIntegracoes(integracoesDaCategoria(categoria), jaUsa).slice(0, 3);

  const catLabel = {
    atendimento: 'atendimento',
    vendas: 'vendas e follow-up',
    operacao: 'operação',
    financeiro: 'financeiro',
  }[categoria];

  const jaUsaNota = jaUsa.length
    ? `Você marcou que já usa: ${jaUsa.join(', ')}. As integrações abaixo estão ordenadas pra aproveitar isso.`
    : 'Você marcou que ainda não usa nenhuma ferramenta — o ponto de partida abaixo assume que você começa do zero.';

  return {
    geradoEm: new Date().toISOString(),
    perfil,
    categoria,
    tituloResultado: resultado.titulo,
    resumo: `${RESUMO_PERFIL[perfil](catLabel)} ${jaUsaNota}`.trim(),
    jaUsa,
    pontoDePartida,
    alternativas,
    integracoes,
    quandoEvoluir: EVOLUIR[categoria],
    checklist: montarChecklist(pontoDePartida, integracoes),
    notaFerramentasGerais:
      'Independente do que você montar aqui, ter ChatGPT, Claude ou Gemini aberto no dia a dia resolve boa parte do trabalho manual de texto (e-mail, resumo, roteiro). Comece por um só.',
  };
}
