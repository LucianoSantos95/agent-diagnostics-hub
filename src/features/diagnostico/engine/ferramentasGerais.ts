import type { Categoria } from './recomendacao';

export interface StackItem {
  papel: string; // Ex.: "Agente", "Automação", "CRM"
  nome: string;
  url: string;
  descricao: string;
}

export interface FerramentaIAGeral {
  nome: string;
  url: string;
  forte: string; // 3-6 palavras
  comoUsar: string; // aplicação prática no negócio
}

export interface CombinacaoLogica {
  titulo: string;
  descricao: string;
  fluxo: string[]; // passos "Ferramenta (papel)"
  paraQuem: string;
}

// Stack completa por categoria — 5 papéis cobrindo o fluxo inteiro
export const STACKS: Record<Categoria, StackItem[]> = {
  atendimento: [
    { papel: 'Agente', nome: 'Typebot', url: 'https://typebot.io', descricao: 'Bot no WhatsApp responde 24/7' },
    { papel: 'Automação', nome: 'Make', url: 'https://make.com', descricao: 'Conecta o bot ao CRM e planilhas' },
    { papel: 'CRM', nome: 'RD Station CRM', url: 'https://www.rdstation.com/crm/', descricao: 'Histórico de cada cliente num só lugar' },
    { papel: 'Analytics', nome: 'PostHog', url: 'https://posthog.com', descricao: 'Vê onde o cliente abandona a conversa' },
    { papel: 'IA geral', nome: 'ChatGPT', url: 'https://chat.openai.com', descricao: 'Redige respostas complexas quando o bot escala' },
  ],
  vendas: [
    { papel: 'Agente', nome: 'Kommo', url: 'https://www.kommo.com', descricao: 'Follow-up automático no WhatsApp' },
    { papel: 'CRM', nome: 'RD Station CRM', url: 'https://www.rdstation.com/crm/', descricao: 'Pipeline visual de oportunidades' },
    { papel: 'Automação', nome: 'Zapier', url: 'https://zapier.com', descricao: 'Move lead entre canais sem cópia manual' },
    { papel: 'Analytics', nome: 'Pipedrive Insights', url: 'https://pipedrive.com', descricao: 'Taxa de conversão por etapa do funil' },
    { papel: 'IA geral', nome: 'Claude', url: 'https://claude.ai', descricao: 'Escreve proposta comercial personalizada' },
  ],
  operacao: [
    { papel: 'Automação', nome: 'Make', url: 'https://make.com', descricao: 'Orquestra rotinas entre sistemas' },
    { papel: 'Automação alt.', nome: 'n8n', url: 'https://n8n.io', descricao: 'Open source, controle total sem custo por uso' },
    { papel: 'Base de dados', nome: 'Airtable', url: 'https://airtable.com', descricao: 'Planilha inteligente como fonte de verdade' },
    { papel: 'Analytics', nome: 'Google Looker Studio', url: 'https://lookerstudio.google.com', descricao: 'Dashboards gratuitos consolidando tudo' },
    { papel: 'IA geral', nome: 'ChatGPT', url: 'https://chat.openai.com', descricao: 'Transforma dados brutos em resumos executivos' },
  ],
  financeiro: [
    { papel: 'Cobrança', nome: 'Asaas', url: 'https://asaas.com', descricao: 'Régua de cobrança automática (PIX/boleto)' },
    { papel: 'Conta PJ', nome: 'Conta Simples', url: 'https://contasimples.com', descricao: 'Categorização automática de despesas' },
    { papel: 'Automação', nome: 'Make', url: 'https://make.com', descricao: 'Concilia extrato com CRM/planilha' },
    { papel: 'Analytics', nome: 'Google Sheets + Looker', url: 'https://lookerstudio.google.com', descricao: 'Previsão de caixa atualizada em tempo real' },
    { papel: 'IA geral', nome: 'ChatGPT', url: 'https://chat.openai.com', descricao: 'Analisa fluxo e sinaliza anomalias' },
  ],
};

// Ferramentas gerais de IA — bloco fixo, aparece em todas categorias
export const IA_GERAL: FerramentaIAGeral[] = [
  {
    nome: 'ChatGPT',
    url: 'https://chat.openai.com',
    forte: 'Versátil, rápido, integra com apps',
    comoUsar:
      'Use no dia a dia para: redigir e-mail de cobrança educada, resumir reunião gravada, criar descrição de produto, gerar roteiro de vídeo curto e brainstorm de campanha. É o ponto de entrada mais barato para IA.',
  },
  {
    nome: 'Claude',
    url: 'https://claude.ai',
    forte: 'Textos longos e análise de documentos',
    comoUsar:
      'Use quando o problema tem muito texto: revisar contrato antes de assinar, sumarizar edital de 40 páginas, extrair cláusulas de risco, analisar planilha grande de vendas e escrever propostas comerciais detalhadas.',
  },
  {
    nome: 'Gemini',
    url: 'https://gemini.google.com',
    forte: 'Integrado ao Google Workspace',
    comoUsar:
      'Use se você vive no Google: gera texto direto no Docs, resumo de tópicos no Gmail, insights em planilhas do Sheets e cria apresentações no Slides a partir de um briefing. Zero fricção de copiar/colar.',
  },
  {
    nome: 'Perplexity',
    url: 'https://perplexity.ai',
    forte: 'Pesquisa com fontes citadas',
    comoUsar:
      'Use para decisão que precisa de base: pesquisar concorrente, comparar planos de fornecedores, checar tendências do setor e validar preço de mercado. Diferente do ChatGPT, ela cita as fontes que você pode conferir.',
  },
];

// Combinações lógicas de fluxo — mostram como o kit se encaixa
export const COMBINACOES: Record<Categoria, CombinacaoLogica[]> = {
  atendimento: [
    {
      titulo: 'Captação → Qualificação → Venda',
      descricao: 'Do primeiro clique no Instagram até o cliente comprando, sem você tocar em cada etapa.',
      fluxo: ['Instagram DM', 'ManyChat (triagem)', 'Typebot (qualifica no WhatsApp)', 'RD Station (registra lead)', 'ChatGPT (propostas)'],
      paraQuem: 'Quem recebe leads no Instagram e perde por demora',
    },
    {
      titulo: 'Atendimento 24/7 com escalonamento humano',
      descricao: 'Bot resolve o simples, escala o complexo pra você — nada fica esquecido.',
      fluxo: ['Typebot (bot 24h)', 'Make (roteia por tipo)', 'WhatsApp humano', 'Notion (registro)', 'Claude (redação difícil)'],
      paraQuem: 'Time enxuto que atende fora do horário comercial',
    },
    {
      titulo: 'Recuperação de contato frio',
      descricao: 'Reativa cliente que sumiu sem esforço manual.',
      fluxo: ['RD Station (identifica frios)', 'Make (gatilho por inatividade)', 'Typebot (reengajamento)', 'ChatGPT (mensagem personalizada)'],
      paraQuem: 'Negócio com base de clientes que compram esporadicamente',
    },
  ],
  vendas: [
    {
      titulo: 'Follow-up que não esquece ninguém',
      descricao: 'Cadência automática de contatos até o lead responder ou pedir pra sair.',
      fluxo: ['Kommo (pipeline)', 'Make (agenda follow-ups)', 'WhatsApp (envio)', 'Claude (mensagem personalizada)'],
      paraQuem: 'Vendedor que perde negócio por esquecer de cobrar resposta',
    },
    {
      titulo: 'Proposta comercial em 5 minutos',
      descricao: 'Do briefing à proposta pronta pra enviar, sem começar do zero.',
      fluxo: ['CRM (contexto do lead)', 'Claude (redação da proposta)', 'Google Docs (edição final)', 'DocuSign (assinatura)'],
      paraQuem: 'Quem vende B2B com proposta customizada',
    },
    {
      titulo: 'Lead score automático',
      descricao: 'IA classifica quais leads valem seu tempo agora.',
      fluxo: ['Formulário do site', 'Make (envia pro ChatGPT)', 'ChatGPT (classifica quente/morno/frio)', 'RD Station (marca prioridade)'],
      paraQuem: 'Quem recebe muito lead e não sabe por onde começar',
    },
  ],
  operacao: [
    {
      titulo: 'Relatório semanal automático',
      descricao: 'O relatório que você faz toda sexta, rodando sozinho.',
      fluxo: ['Google Sheets (dados)', 'Make (agenda semanal)', 'ChatGPT (resumo executivo)', 'Slack/E-mail (entrega)'],
      paraQuem: 'Gestor que gasta 2h/semana consolidando dados',
    },
    {
      titulo: 'Onboarding de cliente sem manual',
      descricao: 'Novo cliente entra e o sistema já dispara tudo — contrato, boas-vindas, acesso.',
      fluxo: ['Formulário', 'Make (orquestra)', 'DocuSign (contrato)', 'Notion (workspace)', 'Slack (avisa o time)'],
      paraQuem: 'Prestador de serviço que repete o mesmo onboarding',
    },
    {
      titulo: 'IA de bolso para operação',
      descricao: 'Automação com inteligência: não só move dado, entende o dado.',
      fluxo: ['Google Sheets', 'Make (dispara)', 'Claude API (analisa e decide)', 'Notion (registra decisão)'],
      paraQuem: 'Quem já automatizou o simples e quer subir de nível',
    },
  ],
  financeiro: [
    {
      titulo: 'Cobrança sem constrangimento',
      descricao: 'Régua automática que cobra na hora certa, do jeito certo.',
      fluxo: ['Asaas (fatura + PIX)', 'Make (lembrete 3 dias antes)', 'WhatsApp (mensagem)', 'ChatGPT (tom personalizado)'],
      paraQuem: 'Quem cobra manualmente e perde noite pensando em inadimplente',
    },
    {
      titulo: 'Previsão de caixa em tempo real',
      descricao: 'Painel atualizado sozinho, sem você mexer em planilha.',
      fluxo: ['Conta Simples (extrato)', 'Make (sincroniza)', 'Google Sheets (base)', 'Looker Studio (dashboard)'],
      paraQuem: 'Sócio que descobre problema de caixa tarde demais',
    },
    {
      titulo: 'Análise de despesa com IA',
      descricao: 'IA olha seus gastos e aponta onde tem gordura.',
      fluxo: ['Conta Simples (categoriza)', 'Google Sheets', 'Claude (análise mensal)', 'E-mail (relatório)'],
      paraQuem: 'Empresa que sabe quanto entra mas não sabe onde vaza',
    },
  ],
};
