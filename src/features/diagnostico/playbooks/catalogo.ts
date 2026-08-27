import type { Categoria } from '../engine/recomendacao';
import type { FerramentaPlaybook, IntegracaoPlaybook } from './tipos';

// ---------------------------------------------------------------------------
// FERRAMENTAS — passo a passo de setup por ferramenta.
// v1: categoria "atendimento" desenvolvida a fundo (padrão-ouro).
// As outras categorias entram com 1 ferramenta-âncora e serão aprofundadas
// depois (1 categoria por semana).
// ---------------------------------------------------------------------------

const TYPEBOT: FerramentaPlaybook = {
  id: 'typebot',
  nome: 'Typebot',
  url: 'https://typebot.io',
  categorias: ['atendimento'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve:
    'Monta um fluxo de conversa que responde as dúvidas repetidas antes de chegar em você — no site, no WhatsApp ou num link direto.',
  dificuldade: 2,
  tempoSetup: '1 a 3 horas para o primeiro fluxo',
  precoBRL:
    'Plano grátis real para site e link direto. WhatsApp exige o plano pago (a partir de ~US$ 39/mês, cobrado em dólar) + a API oficial da Meta.',
  precisaCartao: false,
  requisitos: [
    'Uma lista das 10 perguntas que você mais recebe (tire 15 min e anote de verdade)',
    'Para WhatsApp: um número dedicado e uma conta Meta Business (não use seu número pessoal)',
  ],
  passos: [
    {
      titulo: 'Crie a conta e um fluxo em branco',
      detalhe:
        'Entre em typebot.io, crie a conta com o Google e clique em "Create a typebot" → "Start from scratch". Dê um nome que você reconheça depois (ex.: "Atendimento - dúvidas comuns").',
    },
    {
      titulo: 'Mapeie as 10 perguntas antes de arrastar qualquer bloco',
      detalhe:
        'No papel ou numa nota: escreva as 10 dúvidas mais frequentes e a resposta curta de cada uma. Esse é o passo que a maioria pula — e é o que faz o bot parecer útil em vez de robô.',
    },
    {
      titulo: 'Monte o menu inicial',
      detalhe:
        'Arraste um bloco de texto ("Olá! Sou o assistente da [empresa]. Como posso ajudar?") e logo abaixo um bloco "Buttons" com as 4–6 opções principais. Cada botão leva a um caminho.',
    },
    {
      titulo: 'Preencha cada caminho com a resposta + uma saída',
      detalhe:
        'Para cada botão: um bloco de texto com a resposta objetiva, e no fim um bloco "Buttons" com "Resolveu?" → Sim (encerra) / Não (mostra "Vou te passar para uma pessoa" e registra o contato).',
    },
    {
      titulo: 'Sempre deixe a rota "falar com humano"',
      detalhe:
        'Adicione no menu inicial um botão "Falar com uma pessoa" que coleta nome + assunto e mostra uma mensagem de que alguém responde em X horas. Bot sem saída humana gera cliente preso e irritado.',
    },
    {
      titulo: 'Publique e escolha onde usar',
      detalhe:
        'Clique em "Publish". Em "Share" você tem: link direto (funciona já), embed no site (cole o script no seu HTML) e WhatsApp (só nos planos pagos — pede a conexão com a WhatsApp Cloud API da Meta).',
    },
  ],
  primeiroTeste:
    'Abra o link direto do bot no seu celular e passe por ele como se fosse um cliente. Teste também clicar em "Não resolveu" e ver se o contato aparece pra você. Só ative pra clientes reais depois disso.',
  erros: [
    'Publicar sem a rota humana — o cliente que o bot não entende fica sem saída',
    'Escrever respostas longas demais — no chat, 2–3 linhas por resposta é o limite',
    'Ligar no WhatsApp sem número dedicado — se cair um bloqueio da Meta, você perde o número pessoal junto',
    'Ativar pra todo mundo de uma vez — comece com 10–20% dos contatos e observe 3 dias',
  ],
};

const MANYCHAT: FerramentaPlaybook = {
  id: 'manychat',
  nome: 'ManyChat',
  url: 'https://manychat.com',
  categorias: ['atendimento'],
  perfis: ['autonomo', 'consultor', 'agencia'],
  oQueResolve:
    'Responde e qualifica DM no Instagram e no Messenger automaticamente — inclusive resposta a comentário que vira conversa na DM.',
  dificuldade: 1,
  tempoSetup: '1 a 2 horas',
  precoBRL:
    'Plano grátis cobre o básico de Instagram/Messenger. Pro a partir de ~US$ 15/mês (escala com o nº de contatos). WhatsApp é um add-on pago à parte.',
  precisaCartao: false,
  requisitos: [
    'Um perfil comercial no Instagram (não perfil pessoal)',
    'Ser admin da página do Facebook ligada a esse Instagram',
  ],
  passos: [
    {
      titulo: 'Conecte o Instagram',
      detalhe:
        'Crie a conta em manychat.com, escolha "Instagram" e autorize. Ele pede que o Instagram seja Business e esteja ligado a uma página do Facebook onde você é admin.',
    },
    {
      titulo: 'Crie a primeira automação de DM',
      detalhe:
        'Em "Automation" → "New Automation" → começe pelo template "Instagram: Reply to DM". Defina a mensagem de boas-vindas e 3–4 botões de assunto.',
    },
    {
      titulo: 'Ligue a resposta a comentário',
      detalhe:
        'Automation → "Comment on my post" → escolha o post (ou "todos"), defina a palavra-chave (ex.: "quero") e a mensagem que a pessoa recebe na DM. É o gatilho que mais traz conversa nova.',
    },
    {
      titulo: 'Adicione a coleta de contato',
      detalhe:
        'No fim do fluxo, use o bloco de pergunta pra capturar e-mail ou telefone e salve num "Custom Field". Isso vira sua lista.',
    },
    {
      titulo: 'Publique e teste com outro perfil',
      detalhe:
        'Ative a automação e mande uma DM de um perfil diferente do seu pra ver o fluxo rodando de verdade.',
    },
  ],
  primeiroTeste:
    'Comente a palavra-chave no seu próprio post usando outra conta e confirme que a DM chega automática, com os botões funcionando.',
  erros: [
    'Perfil pessoal em vez de Business — a API do Instagram não deixa automatizar',
    'Palavra-chave genérica ("sim", "quero") que dispara em comentário que não era pra você',
    'Fluxo que só empurra link sem responder nada — cai o engajamento e o Instagram limita o alcance',
  ],
};

const TIDIO: FerramentaPlaybook = {
  id: 'tidio',
  nome: 'Tidio',
  url: 'https://www.tidio.com',
  categorias: ['atendimento'],
  perfis: ['autonomo', 'consultor', 'empresa'],
  oQueResolve:
    'Chat no site com bot de respostas + uma IA (Lyro) que responde em linguagem natural a partir do conteúdo que você fornece.',
  dificuldade: 1,
  tempoSetup: '30 a 60 minutos',
  precoBRL:
    'Plano grátis com chat e alguns chatbots. Lyro (a IA) tem uma cota grátis de conversas/mês; acima disso, planos a partir de ~US$ 29/mês.',
  precisaCartao: false,
  requisitos: ['Acesso pra colar um script no HTML do site (ou plugin, se for WordPress/Shopify)'],
  passos: [
    {
      titulo: 'Crie a conta e instale o widget',
      detalhe:
        'Em tidio.com, crie a conta e copie o script. Cole antes do </body> do seu site — ou instale o plugin oficial se for WordPress, Shopify ou Wix.',
    },
    {
      titulo: 'Configure horário e mensagem de ausência',
      detalhe:
        'Em Settings → defina seu horário de atendimento e a mensagem que aparece fora dele ("Respondemos em até X horas").',
    },
    {
      titulo: 'Alimente a Lyro com seu conteúdo',
      detalhe:
        'Em "Lyro AI" → adicione FAQ (pergunta e resposta) ou aponte pra URL do seu site. Quanto mais específico o conteúdo, menos ela inventa.',
    },
    {
      titulo: 'Crie 2–3 chatbots de fallback',
      detalhe:
        'Fluxos simples pra quando a Lyro não sabe: "coletar e-mail e assunto", "mostrar link de agendamento", "encaminhar pro WhatsApp".',
    },
  ],
  primeiroTeste:
    'Abra seu site numa aba anônima, faça 3 perguntas reais de cliente pra Lyro e veja se as respostas estão corretas. Corrija o conteúdo onde ela errar.',
  erros: [
    'Deixar a Lyro sem conteúdo próprio — ela responde genérico e às vezes erra',
    'Não configurar a mensagem de ausência — cliente manda mensagem 22h e acha que foi ignorado',
  ],
};

// Âncoras das outras categorias (serão aprofundadas nas próximas iterações).
const KOMMO: FerramentaPlaybook = {
  id: 'kommo',
  nome: 'Kommo',
  url: 'https://www.kommo.com',
  categorias: ['vendas'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'Pipeline de vendas com follow-up automático no WhatsApp.',
  dificuldade: 2,
  tempoSetup: '2 a 4 horas',
  precoBRL: 'Teste grátis de 14 dias. Depois a partir de ~US$ 15/usuário/mês.',
  precisaCartao: false,
  requisitos: ['Definir as etapas do seu funil antes de montar'],
  passos: [
    {
      titulo: 'Monte o funil com as suas etapas reais',
      detalhe: 'Crie o pipeline com as etapas que você já usa (ex.: Novo → Contato feito → Proposta → Fechado).',
    },
    {
      titulo: 'Conecte o WhatsApp',
      detalhe: 'Em Settings → integrações → WhatsApp. Use um número dedicado.',
    },
    {
      titulo: 'Crie 1 sequência de follow-up',
      detalhe: 'Contato inicial → lembrete em 48h → reativação em 7 dias. Uma só, não dez.',
    },
  ],
  primeiroTeste: 'Cadastre um lead de teste e avance ele pelas etapas vendo os follow-ups dispararem.',
  erros: ['Copiar um funil genérico em vez do seu', 'Cadência agressiva demais — vira spam'],
};

const MAKE_TOOL: FerramentaPlaybook = {
  id: 'make',
  nome: 'Make',
  url: 'https://www.make.com',
  categorias: ['operacao'],
  perfis: ['consultor', 'agencia', 'empresa'],
  oQueResolve: 'Liga apps entre si e roda tarefas repetitivas sozinho, em horário ou por gatilho.',
  dificuldade: 2,
  tempoSetup: '1 a 3 horas por automação',
  precoBRL: 'Plano grátis com 1.000 operações/mês. Pago a partir de ~US$ 9/mês.',
  precisaCartao: false,
  requisitos: ['Escolher UMA tarefa repetitiva concreta pra começar'],
  passos: [
    {
      titulo: 'Escolha uma tarefa só',
      detalhe: 'Ex.: "toda vez que chega formulário no site, criar linha na planilha e me avisar".',
    },
    {
      titulo: 'Monte o cenário com 2–3 módulos',
      detalhe: 'Gatilho (webhook/app) → ação (planilha/CRM) → notificação (e-mail/Slack).',
    },
    {
      titulo: 'Rode em paralelo com o manual por 1 semana',
      detalhe: 'Só desligue o processo manual quando a automação rodar 7 dias sem erro.',
    },
  ],
  primeiroTeste: 'Dispare o gatilho de verdade uma vez e confira cada etapa na aba "History".',
  erros: ['Automatizar um processo que já é bagunçado', 'Cenário gigante de primeira — comece com 3 módulos'],
};

const ASAAS: FerramentaPlaybook = {
  id: 'asaas',
  nome: 'Asaas',
  url: 'https://www.asaas.com',
  categorias: ['financeiro'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'Cobrança automática (PIX, boleto, cartão) com régua de lembretes embutida.',
  dificuldade: 1,
  tempoSetup: '1 a 2 horas',
  precoBRL: 'Conta grátis. Cobra taxa por transação (varia por meio de pagamento).',
  precisaCartao: false,
  requisitos: ['CNPJ ou CPF', 'Lista dos clientes que te devem hoje'],
  passos: [
    { titulo: 'Crie a conta e cadastre os clientes', detalhe: 'Importe por planilha ou cadastre um a um.' },
    {
      titulo: 'Configure a régua de cobrança',
      detalhe: 'Lembrete 3 dias antes do vencimento + no dia + 3 dias depois. Ajuste o tom das mensagens.',
    },
    { titulo: 'Ative o PIX automático pra novos clientes', detalhe: 'E acompanhe o primeiro ciclo inteiro antes de expandir.' },
  ],
  primeiroTeste: 'Gere uma cobrança de R$1 pra você mesmo e confira se os lembretes chegam nas datas certas.',
  erros: ['Régua fria demais — deteriora a relação', 'Não conciliar os recebimentos — some dinheiro no meio'],
};

export const FERRAMENTAS: FerramentaPlaybook[] = [
  TYPEBOT, MANYCHAT, TIDIO, KOMMO, MAKE_TOOL, ASAAS,
];

export function ferramentaPorId(id: string): FerramentaPlaybook | undefined {
  return FERRAMENTAS.find((f) => f.id === id);
}

// ---------------------------------------------------------------------------
// INTEGRAÇÕES — como unir uma ferramenta a outra (API / MCP / Make etc).
// v1: atendimento tem integrações concretas; as genéricas valem pra todas as
// frentes (serão especializadas nas próximas iterações).
// ---------------------------------------------------------------------------

const TODAS: Categoria[] = ['atendimento', 'vendas', 'operacao', 'financeiro'];

const GENERICAS: IntegracaoPlaybook[] = [
  {
    id: 'x-planilha',
    titulo: 'Sua ferramenta → Google Sheets (registrar tudo numa planilha)',
    de: 'Sua ferramenta',
    para: 'Google Sheets',
    via: 'make',
    categorias: TODAS,
    quando: 'Você quer um histórico simples do que a ferramenta processa, sem montar CRM ainda.',
    precisaChaveApi: false,
    passos: [
      { titulo: 'Crie a planilha com colunas claras', detalhe: 'Data, o que aconteceu, contato/valor, status. Uma linha por evento.' },
      {
        titulo: 'No Make, ligue o gatilho da ferramenta ao módulo "Google Sheets → Add a Row"',
        detalhe: 'Conecte sua conta Google e mapeie cada campo do gatilho pra uma coluna.',
      },
      { titulo: 'Rode uma vez de verdade', detalhe: 'Dispare o evento real e confirme a linha aparecendo na planilha.' },
    ],
    resultado: 'Cada evento da ferramenta vira uma linha na planilha automaticamente — você abre e vê tudo.',
  },
  {
    id: 'x-crm',
    titulo: 'Sua ferramenta → seu CRM (via Make ou Zapier)',
    de: 'Sua ferramenta',
    para: 'CRM que você já usa',
    via: 'make',
    categorias: TODAS,
    quando: 'Você já tem um CRM e não quer digitar de novo o que a ferramenta já capturou.',
    precisaChaveApi: true,
    passos: [
      {
        titulo: 'Pegue o token de API do seu CRM',
        detalhe: 'Fica em Configurações → Integrações / Token de API. Copie e guarde com cuidado.',
      },
      {
        titulo: 'No Make/Zapier, monte: gatilho da ferramenta → ação no CRM',
        detalhe: 'Ex.: "novo contato" → "criar/atualizar lead". Conecte o CRM com o token.',
      },
      {
        titulo: 'Mapeie os campos e evite duplicado',
        detalhe: 'Use e-mail ou telefone como chave pra "atualizar se já existe" em vez de criar repetido.',
      },
      { titulo: 'Teste com um registro real', detalhe: 'E confira no CRM se caiu na etapa/lista certa.' },
    ],
    resultado: 'O que a ferramenta captura entra no seu CRM sozinho, sem retrabalho de digitação.',
  },
  {
    id: 'x-ia-api',
    titulo: 'Sua ferramenta ↔ ChatGPT / Claude via API',
    de: 'Sua ferramenta',
    para: 'OpenAI ou Anthropic (API)',
    via: 'api',
    categorias: TODAS,
    quando: 'Você quer que a automação não só mova dado, mas entenda o dado (classificar, resumir, redigir).',
    precisaChaveApi: true,
    passos: [
      {
        titulo: 'Crie uma chave de API',
        detalhe: 'platform.openai.com (OpenAI) ou console.anthropic.com (Anthropic). É como senha e gera custo por uso — defina um limite de gasto na conta.',
      },
      {
        titulo: 'No Make/Zapier, adicione o módulo de IA no meio do fluxo',
        detalhe: 'Entre o gatilho e a ação final. Ambos têm módulo nativo de OpenAI; pra Anthropic use "HTTP request" pro endpoint /v1/messages.',
      },
      {
        titulo: 'Escreva um prompt curto e específico',
        detalhe: 'Diga o papel, o que fazer, o formato da resposta e "se não souber, responda VAZIO". Quanto mais específico, menos erro.',
      },
      { titulo: 'Use a saída da IA na próxima etapa', detalhe: 'Ex.: classificação → decide o caminho; resumo → vai pro e-mail; rascunho → entra no CRM pra revisão humana.' },
    ],
    resultado: 'A automação passa a tomar decisões simples e gerar texto no seu tom, sem você no meio.',
  },
  {
    id: 'x-mcp',
    titulo: 'Conectar suas ferramentas a um assistente de IA via MCP',
    de: 'Suas ferramentas',
    para: 'Assistente de IA (Claude, etc) via MCP',
    via: 'mcp',
    categorias: TODAS,
    quando: 'Você já usa um assistente de IA e quer que ele consulte seus dados sem você copiar e colar.',
    precisaChaveApi: true,
    passos: [
      {
        titulo: 'Entenda MCP em 1 frase',
        detalhe: 'MCP (Model Context Protocol) é o padrão que deixa um assistente de IA usar ferramentas externas — como plugins que ele chama sozinho quando precisa.',
      },
      {
        titulo: 'Veja se a ferramenta já tem servidor MCP',
        detalhe: 'Procure "[nome da ferramenta] MCP" na documentação dela. Se tiver, você cola a URL/credencial no seu cliente (Claude Desktop, etc).',
      },
      {
        titulo: 'Se não tiver, exponha o essencial via Make/n8n',
        detalhe: 'Crie 2–3 cenários com webhook (ex.: "buscar por contato", "marcar como feito") e chame-os por um MCP genérico de HTTP.',
      },
      {
        titulo: 'Restrinja o acesso',
        detalhe: 'Dê só as ações que você quer automatizar (ler é mais seguro que escrever) e use uma credencial separada e revogável.',
      },
    ],
    resultado: 'Você pergunta ao assistente "como está X hoje?" e ele consulta a ferramenta e responde — sem você abrir o painel.',
  },
];

const ESPECIFICAS: IntegracaoPlaybook[] = [
  {
    id: 'typebot-planilha',
    titulo: 'Typebot → Google Sheets (registrar todo contato numa planilha)',
    de: 'typebot',
    para: 'Google Sheets',
    via: 'nativo',
    categorias: ['atendimento'],
    quando: 'Você quer um histórico simples de quem falou com o bot e o que pediu, sem CRM ainda.',
    precisaChaveApi: false,
    passos: [
      {
        titulo: 'Crie a planilha com as colunas certas',
        detalhe: 'Data, Nome, Contato, Assunto, "Resolvido pelo bot?". Uma linha por conversa.',
      },
      {
        titulo: 'No Typebot, adicione o bloco "Google Sheets"',
        detalhe: 'No fim do fluxo, arraste o bloco de integração Google Sheets e conecte sua conta Google.',
      },
      {
        titulo: 'Mapeie as variáveis do fluxo para as colunas',
        detalhe:
          'Escolha a ação "Insert row" e ligue cada variável que você coletou (nome, contato, assunto) à coluna correspondente.',
      },
      {
        titulo: 'Teste com uma conversa real',
        detalhe: 'Passe pelo bot e confirme que a linha aparece na planilha na hora.',
      },
    ],
    resultado: 'Cada pessoa que fala com o bot vira uma linha na planilha automaticamente — você abre e vê tudo.',
  },
  {
    id: 'typebot-crm-make',
    titulo: 'Typebot → CRM (RD Station / Pipedrive) via Make',
    de: 'typebot',
    para: 'RD Station CRM',
    via: 'make',
    categorias: ['atendimento', 'vendas'],
    quando: 'O contato que o bot qualifica precisa cair direto no seu funil de vendas, não numa planilha solta.',
    precisaChaveApi: true,
    passos: [
      {
        titulo: 'No Make, crie um cenário com gatilho "Webhook"',
        detalhe: 'Adicione o módulo "Webhooks → Custom webhook", copie a URL que ele gera.',
      },
      {
        titulo: 'No Typebot, envie os dados pra esse webhook',
        detalhe:
          'No fim do fluxo, use o bloco "HTTP request" (ou "Webhook"), método POST, cole a URL do Make e mande nome, contato e assunto no corpo.',
      },
      {
        titulo: 'No Make, adicione o módulo do seu CRM',
        detalhe:
          'Ex.: "RD Station CRM → Create Deal" ou "Pipedrive → Create Person + Deal". Conecte com a API key do CRM (fica em Configurações → Token de API).',
      },
      {
        titulo: 'Ligue os campos do webhook aos campos do CRM',
        detalhe: 'Nome → Nome, Contato → E-mail/Telefone, Assunto → Observação ou campo customizado.',
      },
      {
        titulo: 'Rode o teste do Make e confira no CRM',
        detalhe: 'Use "Run once" no Make, passe pelo bot, e veja o negócio aparecer no funil.',
      },
    ],
    resultado: 'Todo lead que o bot qualifica entra no CRM já na etapa certa, com o contexto da conversa anexado.',
  },
];

// Específicas (mais concretas) primeiro; genéricas como complemento.
export const INTEGRACOES: IntegracaoPlaybook[] = [...ESPECIFICAS, ...GENERICAS];

export function integracoesDaCategoria(categoria: Categoria): IntegracaoPlaybook[] {
  return INTEGRACOES.filter((i) => i.categorias.includes(categoria));
}
