import type { Categoria, Forma, Perfil, ResultadoDiagnostico } from '../engine/recomendacao';
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

// ---------------------------------------------------------------------------
// SUB-FRENTES — o roteamento por keyword mora no motor (rotearSubFrente); aqui
// só mapeamos o id do sub-caso pra ferramenta do catálogo + integração.
// ---------------------------------------------------------------------------
interface SubTool {
  label: string;
  toolId: string;
  integracaoId?: string;
}

const SUB_TOOL: Record<string, SubTool> = {
  // atendimento
  'instagram-dm': { label: 'atendimento no Instagram', toolId: 'manychat', integracaoId: 'atendimento-crm' },
  'site-chat': { label: 'chat no site', toolId: 'tidio', integracaoId: 'atendimento-planilha' },
  multicanal: { label: 'central de atendimento com time', toolId: 'chatwoot', integracaoId: 'atendimento-crm' },
  'whatsapp-faq': { label: 'dúvidas repetidas no WhatsApp', toolId: 'typebot', integracaoId: 'atendimento-crm' },
  // vendas
  'email-sequencia': { label: 'sequência de e-mails automática', toolId: 'brevo', integracaoId: 'crm-email' },
  proposta: { label: 'propostas comerciais', toolId: 'ia-proposta', integracaoId: 'crm-email' },
  'followup-whatsapp': { label: 'follow-up no WhatsApp', toolId: 'kommo', integracaoId: 'crm-whatsapp' },
  'organizar-funil': { label: 'organização do funil', toolId: 'rdstation-crm', integracaoId: 'form-crm' },
  // operação
  'base-dados': { label: 'organizar a base de dados', toolId: 'airtable', integracaoId: 'planilha-airtable' },
  documento: { label: 'documentos repetitivos', toolId: 'ia-documento', integracaoId: 'automacao-ia' },
  tecnico: { label: 'automação sem limite', toolId: 'n8n', integracaoId: 'automacao-ia' },
  automatizar: { label: 'automatizar tarefa repetitiva', toolId: 'make', integracaoId: 'automacao-planilha' },
  // financeiro
  recorrencia: { label: 'cobrança recorrente', toolId: 'vindi', integracaoId: 'cobranca-crm' },
  'nota-fiscal': { label: 'emissão de nota fiscal', toolId: 'enotas', integracaoId: 'cobranca-crm' },
  conciliacao: { label: 'conciliação e previsão de caixa', toolId: 'conta-simples', integracaoId: 'cobranca-previsao' },
  cobranca: { label: 'cobrança automática', toolId: 'asaas', integracaoId: 'cobranca-previsao' },
};

const ANCORA: Record<Categoria, string> = {
  atendimento: 'typebot', vendas: 'rdstation-crm', operacao: 'make', financeiro: 'asaas',
};

function escolherPonto(
  categoria: Categoria,
  perfil: Perfil,
  sub: SubTool,
): { ponto: FerramentaPlaybook; alternativas: FerramentaPlaybook[] } {
  const cands = FERRAMENTAS.filter((f) => f.categorias.includes(categoria));
  const ponto =
    cands.find((f) => f.id === sub.toolId) ??
    cands.find((f) => f.id === ANCORA[categoria]) ??
    cands[0];
  const alternativas = cands
    .filter((f) => f.id !== ponto.id)
    .sort(
      (a, b) =>
        ((b.perfis.includes(perfil) ? 2 : 0) - b.dificuldade) -
        ((a.perfis.includes(perfil) ? 2 : 0) - a.dificuldade),
    );
  return { ponto, alternativas };
}

function ordenarIntegracoes(
  integracoes: IntegracaoPlaybook[],
  jaUsa: string[],
  complementoLabel: string,
  subPreferida?: string,
): IntegracaoPlaybook[] {
  const c = complementoLabel.toLowerCase();
  const score = (i: IntegracaoPlaybook) => {
    const alvo = `${i.titulo} ${i.para} ${i.de}`.toLowerCase();
    let s = i.via === 'nativo' ? 1 : 0;
    if (i.id === subPreferida) s += 2;
    // casa com o que a pessoa declarou que já usa (complementoLabel)
    if (/crm/.test(c) && /crm/.test(alvo)) s += 6;
    if (/automa|make|zapier/.test(c) && (/make|zapier|automa/.test(alvo) || i.via === 'make')) s += 6;
    if (/planilha/.test(c) && /planilha|sheets|airtable/.test(alvo)) s += 6;
    if (/\bia\b|api/.test(c) && (/\bia\b|openai|claude|api/.test(alvo) || i.via === 'api')) s += 6;
    if (/cobran/.test(c) && /cobran|asaas|pagamento|recebiv/.test(alvo)) s += 6;
    // reforço fraco pelos grupos de jaUsa
    if (usa(jaUsa, 'crm') && /crm/.test(alvo)) s += 3;
    if (usa(jaUsa, 'automacao') && (/make|zapier|automa/.test(alvo) || i.via === 'make')) s += 3;
    if (usa(jaUsa, 'planilha') && /planilha|sheets/.test(alvo)) s += 3;
    if (usa(jaUsa, 'iaGeral') && (i.via === 'api' || i.via === 'mcp')) s += 3;
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
  forma: Forma,
  ponto: FerramentaPlaybook,
  integracoes: IntegracaoPlaybook[],
): string[] {
  if (forma === 'agente') {
    return [
      'Mapeei o processo atual em passos (quem faz o quê, em que ordem)',
      'Listei o que o agente precisa consultar/atualizar (sistemas, planilhas, base)',
      'Defini o critério de decisão que hoje está na minha cabeça',
      'Separei 1 caso de uso pra rodar ponta a ponta antes de expandir',
      'Agendei a conversa pra desenhar o agente',
    ];
  }
  if (forma === 'validar') {
    return [
      'Escrevi onde perco tempo/dinheiro hoje — em horas/semana ou R$/mês',
      'Confirmei que essa é a dor mais cara agora (não outra escondida)',
      'Anotei o que já tentei e por que não engatou',
      'Agendei a conversa de validação',
    ];
  }
  const base = [
    `Escolhi ${ponto.nome} como ponto de partida e criei a conta`,
    ...ponto.passos.slice(0, 3).map((p) => p.titulo),
    ponto.primeiroTeste ? `Fiz o primeiro teste: ${ponto.primeiroTeste.split('.')[0]}` : 'Testei como se fosse um cliente',
  ];
  const integ = integracoes.slice(0, 1).map((i) => `Montei a integração: ${i.titulo}`);
  return [...base, ...integ];
}

// "O que um agente resolve no seu caso" — mostrado quando forma = 'agente'.
const AGENTE_RESOLVE: Record<Categoria, string[]> = {
  atendimento: [
    'Responde com o contexto do seu negócio (não só um roteiro fixo) e escala pra humano na hora certa',
    'Se integra ao que você já usa — CRM, agenda, base de conhecimento — em vez de virar mais uma ilha',
    'É ajustado e mantido conforme suas dúvidas mudam, sem reconstruir o fluxo toda vez',
  ],
  vendas: [
    'Qualifica e prioriza lead pelo seu critério, não por um padrão genérico',
    'Puxa e devolve dados do seu CRM/planilha, mantendo tudo num lugar só',
    'A cadência de follow-up é desenhada pro seu ciclo de venda e ajustada com o tempo',
  ],
  operacao: [
    'Não só move dado — decide (classifica, resume, valida) com a lógica do seu processo',
    'Conecta os sistemas que você já roda, com tratamento de erro de verdade',
    'Evolui conforme o processo muda, sem refazer a automação inteira',
  ],
  financeiro: [
    'Régua de cobrança com o seu tom e as suas regras, não um template',
    'Concilia recebimentos com o seu CRM/planilha automaticamente',
    'Previsão de caixa que se atualiza sozinha a partir das suas fontes reais',
  ],
};

const VALIDAR_PERGUNTAS = [
  'Onde exatamente você perde tempo/dinheiro hoje — dá pra medir em horas/semana ou R$/mês?',
  'Essa é a dor mais cara agora, ou tem outra maior escondida?',
  'O que você já tentou e por que não engatou?',
];

const DIF_TXT = ['', 'fácil', 'média', 'técnica'];
const FRENTE_LABEL: Record<Categoria, string> = {
  atendimento: 'atendimento',
  vendas: 'vendas e follow-up',
  operacao: 'operação',
  financeiro: 'financeiro',
};

function conteudoPorForma(
  forma: Forma,
  ponto: FerramentaPlaybook,
  resultado: ResultadoDiagnostico,
  subLabel: string,
): { headline: string; subheadline: string; resumoBullets: string[] } {
  const frente = FRENTE_LABEL[resultado.categoria];
  const alvo = subLabel || frente;

  if (forma === 'agente') {
    return {
      headline: 'Seu caso pede um agente sob medida',
      subheadline: resultado.formaMotivo,
      resumoBullets: AGENTE_RESOLVE[resultado.categoria],
    };
  }
  if (forma === 'validar') {
    return {
      headline: 'Vale validar antes de escolher ferramenta',
      subheadline: 'Suas respostas apontam pra mais de uma direção. O caminho abaixo é pra validar — não a resposta definitiva.',
      resumoBullets: VALIDAR_PERGUNTAS,
    };
  }
  if (forma === 'ferramenta-mais-complemento') {
    return {
      headline: `Duas peças: ${ponto.nome} + ligar ${resultado.complementoLabel}`,
      subheadline: `${ponto.nome} resolve ${alvo}; ligar ${resultado.complementoLabel} tira o retrabalho de passar dado de um lado pro outro.`,
      resumoBullets: [
        `Peça 1 — ${ponto.nome}: ${ponto.oQueResolve}`,
        `Peça 2 — conectar ${resultado.complementoLabel}, pra o que entra numa ponta aparecer na outra sozinho.`,
        'Setup das duas + a integração passo a passo estão no PDF.',
      ],
    };
  }
  // uma-ferramenta
  return {
    headline: `Comece com uma ferramenta: ${ponto.nome}`,
    subheadline: `Pra ${alvo}, ${ponto.nome} resolve o essencial — sem precisar montar um monte de coisa junto.`,
    resumoBullets: [
      ponto.oQueResolve,
      `Dificuldade ${DIF_TXT[ponto.dificuldade]} · ${ponto.tempoSetup} · ${ponto.precoBRL.split('.')[0]}.`,
      `Passo a passo (${ponto.passos.length} passos), erros comuns e checklist estão no PDF.`,
    ],
  };
}

/**
 * Monta o playbook personalizado a partir do resultado do diagnóstico.
 * O conteúdo muda conforme `resultado.forma` — complemento só entra se a forma
 * for 'ferramenta-mais-complemento'. Puro, sem I/O.
 */
export function montarPlaybook(resultado: ResultadoDiagnostico, _tarefaLivre = ''): Playbook {
  const { categoria, perfil, jaUsa, forma } = resultado;

  // O sub-caso já foi roteado pelo motor (resultado.subFrenteId).
  const sub: SubTool = SUB_TOOL[resultado.subFrenteId] ?? {
    label: FRENTE_LABEL[categoria],
    toolId: ANCORA[categoria],
  };
  const { ponto: pontoDePartida, alternativas: altRanqueadas } = escolherPonto(categoria, perfil, sub);

  // Integrações e alternativas dependem da forma.
  let integracoes: IntegracaoPlaybook[] = [];
  let alternativas: FerramentaPlaybook[] = [];
  if (forma === 'ferramenta-mais-complemento') {
    integracoes = ordenarIntegracoes(
      integracoesDaCategoria(categoria),
      jaUsa,
      resultado.complementoLabel,
      sub.integracaoId,
    ).slice(0, 1);
    alternativas = altRanqueadas.slice(0, 1);
  } else if (forma === 'uma-ferramenta') {
    alternativas = altRanqueadas.slice(0, 1);
  }
  // 'agente' e 'validar': sem integrações, sem alternativas.

  const { headline, subheadline, resumoBullets } = conteudoPorForma(forma, pontoDePartida, resultado, sub.label);

  const catLabel = FRENTE_LABEL[categoria];
  const jaUsaNota = jaUsa.length
    ? `Você marcou que já usa: ${jaUsa.join(', ')}.`
    : 'Você marcou que ainda não usa nenhuma ferramenta — o caminho abaixo assume que você começa do zero.';

  return {
    geradoEm: new Date().toISOString(),
    forma,
    perfil,
    categoria,
    tituloResultado: resultado.titulo,
    headline,
    subheadline,
    complementoLabel: resultado.complementoLabel,
    resumoBullets,
    resumo: `${RESUMO_PERFIL[perfil](catLabel)} ${jaUsaNota}`.trim(),
    jaUsa,
    pontoDePartida,
    alternativas,
    integracoes,
    quandoEvoluir: EVOLUIR[categoria],
    checklist: montarChecklist(forma, pontoDePartida, integracoes),
    notaFerramentasGerais:
      'Independente do que você montar aqui, ter ChatGPT, Claude ou Gemini aberto no dia a dia resolve boa parte do trabalho manual de texto (e-mail, resumo, roteiro). Comece por um só.',
  };
}
