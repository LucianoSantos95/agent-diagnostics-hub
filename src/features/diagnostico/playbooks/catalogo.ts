import type { Categoria } from '../engine/recomendacao';
import type { FerramentaPlaybook, IntegracaoPlaybook } from './tipos';

// ---------------------------------------------------------------------------
// FERRAMENTAS — passo a passo de setup por ferramenta.
// Cada frente tem um leque de sub-casos (ver SUB_FRENTES em montar.ts); o
// texto livre da P4/P6 roteia pro sub-caso certo. Preços em faixas reais BR.
// ---------------------------------------------------------------------------

// ============================ ATENDIMENTO ============================

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
    'Plano grátis real para site e link direto. WhatsApp exige o plano pago (a partir de ~US$ 39/mês) + a API oficial da Meta.',
  precisaCartao: false,
  requisitos: [
    'Uma lista das 10 perguntas que você mais recebe (tire 15 min e anote de verdade)',
    'Para WhatsApp: um número dedicado e uma conta Meta Business (não use seu número pessoal)',
  ],
  passos: [
    { titulo: 'Crie a conta e um fluxo em branco', detalhe: 'Entre em typebot.io, crie a conta com o Google e "Create a typebot" → "Start from scratch". Dê um nome que você reconheça depois.' },
    { titulo: 'Mapeie as 10 perguntas antes de arrastar qualquer bloco', detalhe: 'Escreva as 10 dúvidas mais frequentes e a resposta curta de cada uma. É o passo que a maioria pula — e o que faz o bot parecer útil.' },
    { titulo: 'Monte o menu inicial', detalhe: 'Um bloco de texto de saudação e logo abaixo um bloco "Buttons" com as 4–6 opções principais. Cada botão leva a um caminho.' },
    { titulo: 'Preencha cada caminho com a resposta + uma saída', detalhe: 'Resposta objetiva e, no fim, "Resolveu?" → Sim (encerra) / Não ("vou te passar para uma pessoa" e registra o contato).' },
    { titulo: 'Sempre deixe a rota "falar com humano"', detalhe: 'Um botão que coleta nome + assunto e avisa em quanto tempo alguém responde. Bot sem saída humana gera cliente preso e irritado.' },
    { titulo: 'Publique e escolha onde usar', detalhe: '"Publish". Em "Share": link direto (funciona já), embed no site, ou WhatsApp (só nos planos pagos, via WhatsApp Cloud API da Meta).' },
  ],
  primeiroTeste: 'Abra o link direto do bot no celular e passe por ele como cliente. Teste o "Não resolveu" e confirme que o contato chega até você. Só ative pra clientes reais depois disso.',
  erros: [
    'Publicar sem a rota humana — quem o bot não entende fica sem saída',
    'Respostas longas demais — no chat, 2–3 linhas por resposta é o limite',
    'Ligar no WhatsApp sem número dedicado — um bloqueio da Meta leva o número pessoal junto',
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
  precoBRL: 'Plano grátis cobre o básico de Instagram/Messenger. Pro a partir de ~US$ 15/mês (escala com o nº de contatos). WhatsApp é add-on pago.',
  precisaCartao: false,
  requisitos: ['Um perfil comercial no Instagram (não pessoal)', 'Ser admin da página do Facebook ligada a esse Instagram'],
  passos: [
    { titulo: 'Conecte o Instagram', detalhe: 'Crie a conta em manychat.com, escolha "Instagram" e autorize. Exige Instagram Business ligado a uma página do Facebook onde você é admin.' },
    { titulo: 'Crie a primeira automação de DM', detalhe: 'Automation → New Automation → template "Instagram: Reply to DM". Mensagem de boas-vindas + 3–4 botões de assunto.' },
    { titulo: 'Ligue a resposta a comentário', detalhe: 'Automation → "Comment on my post" → escolha o post, defina a palavra-chave e a mensagem que a pessoa recebe na DM. É o gatilho que mais traz conversa nova.' },
    { titulo: 'Adicione a coleta de contato', detalhe: 'No fim do fluxo, capture e-mail ou telefone num "Custom Field". Isso vira sua lista.' },
    { titulo: 'Publique e teste com outro perfil', detalhe: 'Ative e mande uma DM de um perfil diferente do seu pra ver o fluxo rodando.' },
  ],
  primeiroTeste: 'Comente a palavra-chave no seu próprio post usando outra conta e confirme que a DM chega automática, com os botões funcionando.',
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
  oQueResolve: 'Chat no site com bot de respostas + uma IA (Lyro) que responde em linguagem natural a partir do conteúdo que você fornece.',
  dificuldade: 1,
  tempoSetup: '30 a 60 minutos',
  precoBRL: 'Plano grátis com chat e alguns chatbots. Lyro (a IA) tem cota grátis de conversas/mês; acima disso, planos a partir de ~US$ 29/mês.',
  precisaCartao: false,
  requisitos: ['Acesso pra colar um script no HTML do site (ou plugin, se for WordPress/Shopify)'],
  passos: [
    { titulo: 'Crie a conta e instale o widget', detalhe: 'Copie o script e cole antes do </body> do site — ou instale o plugin oficial (WordPress, Shopify, Wix).' },
    { titulo: 'Configure horário e mensagem de ausência', detalhe: 'Settings → horário de atendimento e a mensagem fora dele ("respondemos em até X horas").' },
    { titulo: 'Alimente a Lyro com seu conteúdo', detalhe: '"Lyro AI" → adicione FAQ (pergunta/resposta) ou aponte pra URL do seu site. Quanto mais específico, menos ela inventa.' },
    { titulo: 'Crie 2–3 chatbots de fallback', detalhe: 'Pra quando a Lyro não sabe: "coletar e-mail e assunto", "mostrar link de agendamento", "encaminhar pro WhatsApp".' },
  ],
  primeiroTeste: 'Abra o site numa aba anônima, faça 3 perguntas reais de cliente pra Lyro e corrija o conteúdo onde ela errar.',
  erros: [
    'Deixar a Lyro sem conteúdo próprio — responde genérico e às vezes erra',
    'Não configurar a mensagem de ausência — cliente manda 22h e acha que foi ignorado',
  ],
};

const CHATWOOT: FerramentaPlaybook = {
  id: 'chatwoot',
  nome: 'Chatwoot',
  url: 'https://www.chatwoot.com',
  categorias: ['atendimento'],
  perfis: ['agencia', 'empresa'],
  oQueResolve: 'Caixa de entrada compartilhada: WhatsApp, Instagram, e-mail e chat do site num painel só, com o time atendendo sem responder em duplicidade.',
  dificuldade: 2,
  tempoSetup: '2 a 4 horas (nuvem) ou 1 dia (auto-hospedado)',
  precoBRL: 'Auto-hospedado é grátis (paga só o servidor, ~R$ 40–120/mês). Nuvem oficial a partir de ~US$ 19/agente/mês.',
  precisaCartao: false,
  requisitos: ['Definir quem do time atende o quê', 'Para WhatsApp: número dedicado + WhatsApp Cloud API'],
  passos: [
    { titulo: 'Suba a instância', detalhe: 'Comece pela nuvem oficial (mais rápido) ou auto-hospede via Docker/Railway se quiser custo fixo.' },
    { titulo: 'Conecte os canais', detalhe: 'Settings → Inboxes → adicione WhatsApp (Cloud API), Instagram, e-mail e o widget do site, um a um.' },
    { titulo: 'Crie os agentes e as equipes', detalhe: 'Convide o time, crie equipes (ex.: Vendas, Suporte) e regras de atribuição automática por canal ou assunto.' },
    { titulo: 'Configure respostas rápidas e etiquetas', detalhe: 'Canned responses pras perguntas comuns + labels pra medir volume por assunto depois.' },
  ],
  primeiroTeste: 'Mande uma mensagem de cada canal e confirme que cai na equipe certa e que dois agentes não pegam a mesma conversa.',
  erros: [
    'Auto-hospedar sem quem cuide do servidor — atualização e backup viram problema',
    'Não definir atribuição — todo mundo vê tudo e ninguém assume',
  ],
};

// ============================ VENDAS ============================

const RDSTATION_CRM: FerramentaPlaybook = {
  id: 'rdstation-crm',
  nome: 'RD Station CRM',
  url: 'https://www.rdstation.com/crm/',
  categorias: ['vendas'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'Organiza o funil de vendas num lugar só: cada oportunidade numa etapa, com tarefa de follow-up e histórico — pra parar de perder lead na planilha.',
  dificuldade: 1,
  tempoSetup: '1 a 2 horas',
  precoBRL: 'Plano grátis real pra CRM básico. Pago a partir de ~R$ 60/usuário/mês pra automação e relatórios.',
  precisaCartao: false,
  requisitos: ['As etapas reais do seu funil (do primeiro contato até fechado)', 'A lista de oportunidades abertas hoje'],
  passos: [
    { titulo: 'Monte o funil com as SUAS etapas', detalhe: 'Ex.: Novo → Contato feito → Reunião → Proposta → Fechado. Não copie um funil genérico.' },
    { titulo: 'Importe as oportunidades abertas', detalhe: 'Suba a planilha atual (nome, contato, valor, etapa). Cada linha vira um card no funil.' },
    { titulo: 'Crie a tarefa automática de follow-up', detalhe: 'Regra: ao entrar numa etapa sem movimento em 2 dias, cria tarefa "cobrar retorno". É o que impede o lead de sumir.' },
    { titulo: 'Defina os campos obrigatórios por etapa', detalhe: 'Ex.: só avança pra "Proposta" com valor preenchido. Mantém o relatório confiável.' },
  ],
  primeiroTeste: 'Cadastre um lead de teste, avance ele pelas etapas e confirme que a tarefa de follow-up aparece sozinha na sua agenda.',
  erros: [
    'Recriar a planilha dentro do CRM — se ninguém move os cards, não serve pra nada',
    'Etapas demais — 5 a 6 é o suficiente pra começar',
    'Não registrar o motivo de perda — sem isso você não sabe onde o funil vaza',
  ],
};

const PIPEDRIVE: FerramentaPlaybook = {
  id: 'pipedrive',
  nome: 'Pipedrive',
  url: 'https://www.pipedrive.com',
  categorias: ['vendas'],
  perfis: ['consultor', 'agencia', 'empresa'],
  oQueResolve: 'Pipeline visual muito direto pra times pequenos, com previsão de fechamento e automações de tarefa por etapa.',
  dificuldade: 1,
  tempoSetup: '1 a 2 horas',
  precoBRL: 'Sem plano grátis. Teste de 14 dias; depois a partir de ~US$ 14/usuário/mês.',
  precisaCartao: false,
  requisitos: ['As etapas do seu funil', 'Uma ideia do ciclo médio de venda (dias)'],
  passos: [
    { titulo: 'Configure o pipeline', detalhe: 'Crie as etapas e a probabilidade de fechamento de cada uma (Pipedrive usa isso na previsão).' },
    { titulo: 'Importe contatos e negócios', detalhe: 'Via planilha. Ligue cada negócio a uma pessoa e a uma empresa.' },
    { titulo: 'Crie automações de "atividade"', detalhe: 'Ao mover pra "Proposta", cria automaticamente a atividade "enviar proposta em 24h".' },
    { titulo: 'Ative o "Insights"', detalhe: 'Dashboard de conversão por etapa e por vendedor — olhe 1x por semana.' },
  ],
  primeiroTeste: 'Crie um negócio, mova pelas etapas e confirme que as atividades são criadas e a previsão de receita atualiza.',
  erros: [
    'Não preencher o valor do negócio — a previsão fica inútil',
    'Ignorar as atividades atrasadas — é o sinal de lead esfriando',
  ],
};

const KOMMO: FerramentaPlaybook = {
  id: 'kommo',
  nome: 'Kommo',
  url: 'https://www.kommo.com',
  categorias: ['vendas'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'CRM com o WhatsApp no centro: cada conversa vira card no funil e a sequência de follow-up dispara mensagem automática no WhatsApp.',
  dificuldade: 2,
  tempoSetup: '2 a 4 horas',
  precoBRL: 'Sem plano grátis. Teste de 14 dias; depois a partir de ~US$ 15/usuário/mês. A conexão de WhatsApp pode ter custo à parte.',
  precisaCartao: false,
  requisitos: ['Um número de WhatsApp dedicado (não o pessoal)', 'As etapas do funil definidas'],
  passos: [
    { titulo: 'Monte o funil com as suas etapas', detalhe: 'Ex.: Lead novo → Qualificado → Proposta → Negociação → Ganho/Perdido.' },
    { titulo: 'Conecte o WhatsApp', detalhe: 'Settings → integrações → WhatsApp. Prefira a API oficial se o volume for alto.' },
    { titulo: 'Crie UMA sequência de follow-up', detalhe: 'Contato inicial → lembrete em 48h → reativação em 7 dias. Uma só, não dez.' },
    { titulo: 'Configure o "Salesbot" pra triagem', detalhe: 'Bot que faz 2–3 perguntas de qualificação antes de cair pra um humano.' },
  ],
  primeiroTeste: 'Mande uma mensagem de outro número, veja o card aparecer no funil e a sequência de follow-up disparar nos horários certos.',
  erros: [
    'Cadência agressiva demais — vira spam e o número é bloqueado',
    'Mensagem sem contexto da conversa anterior — parece robô óbvio',
    'Não usar número dedicado — bloqueio da Meta derruba tudo',
  ],
};

const BREVO: FerramentaPlaybook = {
  id: 'brevo',
  nome: 'Brevo',
  url: 'https://www.brevo.com/pt/',
  categorias: ['vendas'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'E-mail marketing + automação de sequências: quem entra na lista recebe a série de e-mails certa, no ritmo certo, sem você mandar um por um.',
  dificuldade: 2,
  tempoSetup: '2 a 4 horas para a primeira automação',
  precoBRL: 'Plano grátis: 300 e-mails/dia, contatos ilimitados. Pago a partir de ~R$ 90/mês (remove limite diário e a marca Brevo).',
  precisaCartao: false,
  requisitos: [
    'Uma lista de contatos com permissão pra receber e-mail (nada de comprar lista)',
    'Idealmente um domínio próprio pra autenticar o envio (SPF/DKIM)',
  ],
  passos: [
    { titulo: 'Crie a conta e importe a lista', detalhe: 'Contacts → Import. Separe por origem (site, evento, indicação) — vai facilitar a segmentação.' },
    { titulo: 'Autentique seu domínio', detalhe: 'Senders & Domains → adicione o domínio e configure os registros SPF/DKIM no seu provedor. Sem isso, cai em spam.' },
    { titulo: 'Escreva a sequência (3 a 5 e-mails)', detalhe: 'Boas-vindas → conteúdo útil → prova (case) → oferta → última chamada. Um assunto por e-mail, uma ação clara.' },
    { titulo: 'Monte a automação', detalhe: 'Automations → "Welcome"/entrada na lista como gatilho → adicione os e-mails com esperas de 1–3 dias entre eles.' },
    { titulo: 'Teste com você mesmo antes de ligar', detalhe: 'Entre na lista com um e-mail seu e percorra a sequência inteira. Confira links, imagens e o remetente.' },
  ],
  primeiroTeste: 'Cadastre um e-mail seu como novo contato e confirme que o primeiro e-mail chega na hora e os seguintes nas datas certas — na caixa de entrada, não no spam.',
  erros: [
    'Não autenticar o domínio — a sequência inteira vai pro spam',
    'Sequência longa demais de primeira — comece com 3 e-mails e cresça',
    'Mesmo e-mail pra todo mundo — segmente ao menos por origem do contato',
    'Importar lista sem permissão — queima o domínio e é ilegal (LGPD)',
  ],
};

const IA_PROPOSTA: FerramentaPlaybook = {
  id: 'ia-proposta',
  nome: 'Claude ou ChatGPT (proposta assistida)',
  url: 'https://claude.ai',
  categorias: ['vendas'],
  perfis: ['autonomo', 'consultor', 'agencia'],
  oQueResolve: 'Transforma o briefing da reunião numa proposta comercial pronta pra revisar em minutos, sempre com a sua estrutura e o seu tom.',
  dificuldade: 1,
  tempoSetup: '1 a 2 horas pra montar o template e o prompt',
  precoBRL: 'Plano grátis já resolve. Pago (~US$ 20/mês) libera modelos melhores e mais uso.',
  precisaCartao: false,
  requisitos: ['Uma proposta antiga que deu certo, pra servir de modelo', 'Os itens fixos: escopo padrão, condições, formas de pagamento'],
  passos: [
    { titulo: 'Monte o template mestre', detalhe: 'Num doc: seções fixas (sobre você, escopo, entregáveis, prazo, investimento, condições) com os trechos que nunca mudam já escritos.' },
    { titulo: 'Escreva o prompt base', detalhe: '"Você é meu assistente comercial. A partir do briefing abaixo, preencha o template mantendo o tom X. Não invente escopo — pergunte se faltar dado."' },
    { titulo: 'Rode com um caso real', detalhe: 'Cole o template + o prompt + as notas da reunião. Revise o que a IA gerou, ajuste, e salve as correções pra melhorar o prompt.' },
    { titulo: 'Padronize a saída', detalhe: 'Peça sempre no mesmo formato (ex.: markdown com as mesmas seções) pra colar direto no seu doc/PDF final.' },
  ],
  primeiroTeste: 'Pegue uma proposta que você já enviou, jogue só o briefing dela na IA e compare o resultado com a proposta real. Ajuste o prompt até ficar perto.',
  erros: [
    'Deixar a IA inventar escopo ou preço — trave isso no prompt',
    'Não revisar — proposta é documento comercial, leia antes de enviar',
    'Prompt novo toda vez — evolua um só, salvo num lugar fácil',
  ],
};

// ============================ OPERAÇÃO ============================

const MAKE_TOOL: FerramentaPlaybook = {
  id: 'make',
  nome: 'Make',
  url: 'https://www.make.com',
  categorias: ['operacao'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'Liga apps entre si e roda tarefas repetitivas sozinho — em horário ou por gatilho. Ex.: chegou formulário → cria linha na planilha → avisa no Slack.',
  dificuldade: 2,
  tempoSetup: '1 a 3 horas por automação',
  precoBRL: 'Plano grátis: 1.000 operações/mês. Pago a partir de ~US$ 9/mês (mais operações e execução mais frequente).',
  precisaCartao: false,
  requisitos: ['UMA tarefa repetitiva concreta pra começar', 'Acesso (login/API) aos apps envolvidos'],
  passos: [
    { titulo: 'Escolha uma tarefa só', detalhe: 'Ex.: "toda vez que chega formulário no site, criar linha na planilha e me avisar". Nada de fluxo gigante de primeira.' },
    { titulo: 'Mapeie o passo a passo manual', detalhe: 'Anote quais apps, em que ordem, e o que decide cada passo. O cenário vai replicar isso.' },
    { titulo: 'Monte o cenário com 2–3 módulos', detalhe: 'Gatilho (webhook/app) → ação (planilha/CRM) → notificação (e-mail/Slack). Ligue os campos um a um.' },
    { titulo: 'Adicione tratamento de erro', detalhe: 'Um "error handler" que te avisa quando o cenário falha. Sem isso, quebra em silêncio por dias.' },
    { titulo: 'Rode em paralelo com o manual por 1 semana', detalhe: 'Só desligue o processo manual quando a automação rodar 7 dias sem erro.' },
  ],
  primeiroTeste: 'Dispare o gatilho de verdade uma vez e confira cada etapa na aba "History" — dado certo, no lugar certo.',
  erros: [
    'Automatizar um processo que já é bagunçado — a automação replica a bagunça em escala',
    'Planilha como banco de dados de automação — instável e lento; migre pra Airtable quando crescer',
    'Cenário gigante de primeira — 3 módulos e evolui',
  ],
};

const ZAPIER: FerramentaPlaybook = {
  id: 'zapier',
  nome: 'Zapier',
  url: 'https://zapier.com',
  categorias: ['operacao'],
  perfis: ['autonomo', 'consultor', 'empresa'],
  oQueResolve: 'O mesmo que o Make (ligar apps e automatizar), com o maior catálogo de integrações prontas e uma curva de entrada mais suave.',
  dificuldade: 1,
  tempoSetup: '30 min a 2 horas por automação',
  precoBRL: 'Plano grátis: 100 tarefas/mês, automações de 2 passos. Pago a partir de ~US$ 20/mês (multi-passo e mais tarefas).',
  precisaCartao: false,
  requisitos: ['Uma tarefa repetitiva concreta', 'Login nos apps envolvidos'],
  passos: [
    { titulo: 'Crie o "Zap"', detalhe: 'Trigger (o que inicia) + Action (o que acontece). Comece com 1 trigger e 1 action.' },
    { titulo: 'Teste cada passo enquanto monta', detalhe: 'O Zapier puxa um dado real a cada passo — confira antes de avançar.' },
    { titulo: 'Adicione filtros e paths se precisar', detalhe: 'Ex.: só criar a tarefa se o valor for maior que X. "Paths" pra caminhos diferentes por condição.' },
    { titulo: 'Ligue e monitore o histórico', detalhe: 'A aba "Zap History" mostra cada execução. Olhe nos primeiros dias.' },
  ],
  primeiroTeste: 'Acione o gatilho real e confirme no Zap History que rodou e que o resultado apareceu no app de destino.',
  erros: [
    'Estourar o limite de tarefas no plano grátis sem perceber — configure alerta de uso',
    'Zap sem filtro — dispara pra tudo, inclusive o que não devia',
  ],
};

const N8N: FerramentaPlaybook = {
  id: 'n8n',
  nome: 'n8n',
  url: 'https://n8n.io',
  categorias: ['operacao'],
  perfis: ['agencia', 'empresa'],
  oQueResolve: 'Automação open source: mesma ideia do Make, sem custo por operação e com liberdade total (código no meio do fluxo, IA, self-host).',
  dificuldade: 3,
  tempoSetup: '1 dia pra subir + 1 a 3 horas por fluxo',
  precoBRL: 'Auto-hospedado é grátis (paga o servidor, ~R$ 40–150/mês). Cloud oficial a partir de ~€ 20/mês.',
  precisaCartao: false,
  requisitos: ['Alguém confortável com servidor/Docker (ou usar o n8n Cloud)', 'Noção de JSON e de API'],
  passos: [
    { titulo: 'Suba o n8n', detalhe: 'n8n Cloud (rápido) ou Docker no Railway/Render/VPS. Guarde a credencial de admin com cuidado.' },
    { titulo: 'Crie o primeiro workflow', detalhe: 'Nó de gatilho (Webhook/Cron/app) → nós de ação. Cada nó mostra o dado que sai — use isso pra depurar.' },
    { titulo: 'Use o nó "Code" só onde precisa', detalhe: 'Pra transformar dado que os nós prontos não resolvem. Mantenha curto.' },
    { titulo: 'Configure retry e error workflow', detalhe: 'Um workflow separado que recebe os erros e te notifica. Backup do banco do n8n agendado.' },
  ],
  primeiroTeste: 'Rode o workflow manualmente ("Execute Workflow"), veja o dado passando nó a nó, depois ative e dispare pelo gatilho real.',
  erros: [
    'Auto-hospedar sem backup — perde todos os fluxos numa queda',
    'Colocar credencial dentro do nó "Code" — use o cofre de credenciais',
    'Escolher n8n sem ter quem mantenha — o custo real é o tempo de manutenção',
  ],
};

const AIRTABLE: FerramentaPlaybook = {
  id: 'airtable',
  nome: 'Airtable',
  url: 'https://airtable.com',
  categorias: ['operacao'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'Uma planilha que se comporta como banco de dados: registros com tipos de verdade, relações entre tabelas, visões (grade, kanban, calendário) e automações embutidas.',
  dificuldade: 1,
  tempoSetup: '2 a 4 horas pra estruturar a base',
  precoBRL: 'Plano grátis: 1.000 registros por base. Pago a partir de ~US$ 20/usuário/mês (mais registros, automações, sync).',
  precisaCartao: false,
  requisitos: ['A planilha atual que virou caos', 'Clareza do que é "um registro" (um cliente? um projeto? um pedido?)'],
  passos: [
    { titulo: 'Modele as tabelas', detalhe: 'Uma tabela por "coisa" (Clientes, Projetos, Pagamentos). Ligue-as com campos "Link to another record" em vez de repetir texto.' },
    { titulo: 'Importe a planilha', detalhe: 'Importe cada aba como tabela. Ajuste os tipos de campo (data, seleção, moeda, link).' },
    { titulo: 'Crie as visões que o time usa', detalhe: 'Kanban por status, calendário por prazo, grade filtrada por responsável. Cada pessoa abre a visão dela.' },
    { titulo: 'Adicione 1–2 automações', detalhe: 'Ex.: ao marcar "Concluído", notificar no Slack. Ou criar registro em outra tabela.' },
  ],
  primeiroTeste: 'Cadastre um registro real, use os filtros e as visões como o time usaria, e confirme que as relações entre tabelas puxam o dado certo.',
  erros: [
    'Recriar a planilha "plana" — se não usa relações entre tabelas, não ganhou nada',
    'Estourar 1.000 registros no grátis sem perceber',
    'Deixar todo mundo editando a estrutura — trave o schema, libere só os dados',
  ],
};

const IA_DOCUMENTO: FerramentaPlaybook = {
  id: 'ia-documento',
  nome: 'Claude ou ChatGPT (documento repetitivo)',
  url: 'https://claude.ai',
  categorias: ['operacao'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'Gera os documentos que se repetem (relatório semanal, ata, resumo executivo, descrição de produto) a partir de dados brutos, sempre no mesmo formato.',
  dificuldade: 1,
  tempoSetup: '1 a 2 horas por tipo de documento',
  precoBRL: 'Plano grátis resolve os casos simples. Pago (~US$ 20/mês) pra documentos longos e mais volume.',
  precisaCartao: false,
  requisitos: ['2–3 exemplos bons do documento pronto', 'A fonte do dado bruto (planilha, export, transcrição)'],
  passos: [
    { titulo: 'Defina o formato de saída', detalhe: 'Cole 2 exemplos e peça: "esse é o formato. Sempre gere assim." Fixe seções, tom e tamanho.' },
    { titulo: 'Escreva o prompt-modelo', detalhe: '"A partir dos dados abaixo, gere [documento] no formato acima. Se faltar dado, marque [PREENCHER] em vez de inventar."' },
    { titulo: 'Rode com dado real e corrija', detalhe: 'Gere, revise, e transforme cada correção numa regra nova no prompt.' },
    { titulo: 'Automatize a entrada de dados (opcional)', detalhe: 'Quando estabilizar, use Make/Zapier pra montar o "dado bruto" e chamar a IA por API.' },
  ],
  primeiroTeste: 'Pegue os dados de um documento que você já fez à mão e compare o que a IA gera com o original. Ajuste até bater.',
  erros: [
    'Aceitar número que a IA "chutou" — force o [PREENCHER]',
    'Formato diferente a cada vez — prenda o formato no prompt',
  ],
};

// ============================ FINANCEIRO ============================

const ASAAS: FerramentaPlaybook = {
  id: 'asaas',
  nome: 'Asaas',
  url: 'https://www.asaas.com',
  categorias: ['financeiro'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'Cobrança automática (PIX, boleto, cartão) com régua de lembretes embutida — o cliente recebe cobrança e lembrete sozinho, você para de perseguir na mão.',
  dificuldade: 1,
  tempoSetup: '1 a 2 horas',
  precoBRL: 'Conta grátis. Cobra taxa por transação (PIX barato, boleto ~R$ 1,99, cartão % + fixo).',
  precisaCartao: false,
  requisitos: ['CNPJ ou CPF', 'Lista dos clientes que te devem hoje e os vencimentos'],
  passos: [
    { titulo: 'Crie a conta e cadastre os clientes', detalhe: 'Importe por planilha ou cadastre um a um (nome, documento, contato).' },
    { titulo: 'Configure a régua de cobrança', detalhe: 'Lembrete 3 dias antes do vencimento + no dia + 3 dias depois. Ajuste o tom das mensagens pra não soar frio.' },
    { titulo: 'Crie as cobranças (avulsas ou recorrentes)', detalhe: 'Pra mensalidade, use "assinatura" — gera a cobrança todo mês sozinho.' },
    { titulo: 'Ative o PIX automático e acompanhe o 1º ciclo', detalhe: 'Deixe um ciclo inteiro rodar observando antes de cadastrar todo mundo.' },
  ],
  primeiroTeste: 'Gere uma cobrança de R$ 1 pra você mesmo e confirme que o lembrete chega nas datas certas e a baixa acontece ao pagar.',
  erros: [
    'Régua fria demais — deteriora a relação; escreva como você falaria',
    'Não conciliar os recebimentos com o seu controle — some dinheiro no meio',
    'Cadastrar todo mundo antes de testar um ciclo',
  ],
};

const CORA: FerramentaPlaybook = {
  id: 'cora',
  nome: 'Cora',
  url: 'https://www.cora.com.br',
  categorias: ['financeiro'],
  perfis: ['autonomo', 'consultor', 'agencia', 'empresa'],
  oQueResolve: 'Conta PJ digital com boleto e PIX de cobrança sem tarifa por emissão, régua de cobrança e uma visão de entradas/saídas mais limpa que a do banco tradicional.',
  dificuldade: 1,
  tempoSetup: '1 a 3 dias (inclui abertura da conta)',
  precoBRL: 'Conta e boletos de cobrança sem tarifa de emissão. Alguns recursos avançados são pagos.',
  precisaCartao: false,
  requisitos: ['CNPJ ativo', 'Documentos do sócio pra abertura da conta'],
  passos: [
    { titulo: 'Abra a conta PJ', detalhe: 'Cadastro pelo site/app com os dados da empresa. A aprovação leva de horas a 1–2 dias.' },
    { titulo: 'Cadastre os clientes e emita as cobranças', detalhe: 'Boleto ou PIX de cobrança com vencimento. Dá pra emitir em lote.' },
    { titulo: 'Ligue a régua de cobrança', detalhe: 'Lembretes automáticos antes e depois do vencimento, por e-mail/WhatsApp.' },
    { titulo: 'Categorize entradas e saídas', detalhe: 'Marque cada movimento (fornecedor, imposto, pró-labore) pra o relatório mensal fazer sentido.' },
  ],
  primeiroTeste: 'Emita uma cobrança de valor baixo pra você, confirme o lembrete e a baixa automática ao pagar.',
  erros: [
    'Misturar pessoa física e jurídica na mesma conta — bagunça o controle e a contabilidade',
    'Não categorizar — no fim do mês você tem extrato, não relatório',
  ],
};

const VINDI: FerramentaPlaybook = {
  id: 'vindi',
  nome: 'Vindi',
  url: 'https://vindi.com.br',
  categorias: ['financeiro'],
  perfis: ['agencia', 'empresa'],
  oQueResolve: 'Gestão de receita recorrente: planos, assinaturas, cobrança automática com retentativa inteligente e régua de inadimplência pra negócio de mensalidade.',
  dificuldade: 2,
  tempoSetup: '3 a 6 horas',
  precoBRL: 'Sob consulta — costuma ter mensalidade + % por transação. Faz sentido a partir de algumas dezenas de assinantes.',
  precisaCartao: false,
  requisitos: ['Modelo de planos definido (valores, ciclos, trials)', 'Gateway/adquirente ou uso do da própria Vindi'],
  passos: [
    { titulo: 'Modele os planos', detalhe: 'Cadastre cada plano (valor, ciclo mensal/anual, período de teste). Menos planos = menos dor depois.' },
    { titulo: 'Importe a base de assinantes', detalhe: 'Clientes, cartões tokenizados (se migrando de outro sistema) e a data da próxima cobrança de cada um.' },
    { titulo: 'Configure a régua de inadimplência', detalhe: 'Retentativa de cartão em D+1/D+3/D+7, e-mails de aviso, e quando suspender o acesso.' },
    { titulo: 'Ligue o webhook no seu sistema', detalhe: 'Pra liberar/bloquear acesso do cliente conforme o status da assinatura (pago, atrasado, cancelado).' },
  ],
  primeiroTeste: 'Crie uma assinatura de teste com cartão de teste, force uma falha de pagamento e confirme que a retentativa e os avisos disparam.',
  erros: [
    'Planos demais — cada um vira um caso de suporte',
    'Não tratar o webhook — cliente inadimplente continua com acesso',
  ],
};

const CONTA_SIMPLES: FerramentaPlaybook = {
  id: 'conta-simples',
  nome: 'Conta Simples',
  url: 'https://contasimples.com',
  categorias: ['financeiro'],
  perfis: ['agencia', 'empresa'],
  oQueResolve: 'Conta PJ + cartões corporativos com categorização automática de despesa e controle de quem gasta o quê — pra fechar o mês sabendo onde o dinheiro foi.',
  dificuldade: 1,
  tempoSetup: '1 a 3 dias (inclui abertura)',
  precoBRL: 'Plano grátis com o essencial. Planos pagos pra mais cartões, limites e integrações.',
  precisaCartao: false,
  requisitos: ['CNPJ', 'Lista de quem no time precisa de cartão e com que limite'],
  passos: [
    { titulo: 'Abra a conta e emita os cartões', detalhe: 'Um cartão por pessoa/centro de custo, cada um com limite próprio.' },
    { titulo: 'Defina as categorias', detalhe: 'Ferramentas, marketing, impostos, fornecedores, pró-labore. Poucas e claras.' },
    { titulo: 'Ative a categorização automática e as regras', detalhe: 'Regra por estabelecimento (ex.: "AWS" → Ferramentas) pra não categorizar na mão todo mês.' },
    { titulo: 'Feche o mês no relatório', detalhe: 'Exporte o consolidado por categoria e compare com o mês anterior — é onde a "gordura" aparece.' },
  ],
  primeiroTeste: 'Faça uma compra pequena com o cartão, veja ela cair na categoria certa (ou crie a regra) e apareça no relatório.',
  erros: [
    'Não criar regras — a categorização "automática" ainda erra e vira trabalho manual',
    'Cartão sem limite definido por pessoa — some o controle de quem gasta o quê',
  ],
};

const ENOTAS: FerramentaPlaybook = {
  id: 'enotas',
  nome: 'eNotas',
  url: 'https://enotas.com.br',
  categorias: ['financeiro'],
  perfis: ['consultor', 'agencia', 'empresa'],
  oQueResolve: 'Emissão automática de nota fiscal (de serviço, na prefeitura da sua cidade) disparada quando o cliente paga — sem entrar no site da prefeitura toda vez.',
  dificuldade: 2,
  tempoSetup: '2 a 5 horas (a parte chata é o certificado e a prefeitura)',
  precoBRL: 'A partir de ~R$ 50–100/mês conforme o volume de notas.',
  precisaCartao: false,
  requisitos: ['Certificado digital A1 (arquivo) da empresa', 'Inscrição municipal e acesso ao emissor da sua prefeitura', 'Dados fiscais: item de serviço, alíquota, regime'],
  passos: [
    { titulo: 'Suba o certificado e configure a empresa', detalhe: 'Cadastre o CNPJ, envie o certificado A1 e preencha os dados fiscais (código de serviço, ISS, regime tributário).' },
    { titulo: 'Homologue com a prefeitura', detalhe: 'Emita 1 nota de teste. Cada cidade tem particularidade — é aqui que costuma travar; o suporte ajuda.' },
    { titulo: 'Ligue o gatilho de emissão', detalhe: 'Via integração nativa (Asaas, Stripe, etc.) ou API: "pagamento confirmado" → "emitir nota".' },
    { titulo: 'Configure o envio da nota ao cliente', detalhe: 'E-mail automático com o PDF e o XML assim que a nota é autorizada.' },
  ],
  primeiroTeste: 'Marque um pagamento como pago e confirme que a nota é emitida, autorizada pela prefeitura e enviada ao cliente sem você tocar.',
  erros: [
    'Certificado A1 vencido — a emissão para sem aviso claro',
    'Código de serviço ou alíquota errados — nota sai, mas com imposto errado',
    'Não guardar os XMLs — a contabilidade vai pedir',
  ],
};

export const FERRAMENTAS: FerramentaPlaybook[] = [
  TYPEBOT, MANYCHAT, TIDIO, CHATWOOT,
  RDSTATION_CRM, PIPEDRIVE, KOMMO, BREVO, IA_PROPOSTA,
  MAKE_TOOL, ZAPIER, N8N, AIRTABLE, IA_DOCUMENTO,
  ASAAS, CORA, VINDI, CONTA_SIMPLES, ENOTAS,
];

export function ferramentaPorId(id: string): FerramentaPlaybook | undefined {
  return FERRAMENTAS.find((f) => f.id === id);
}

// ---------------------------------------------------------------------------
// INTEGRAÇÕES — como unir uma ferramenta a outra (nativo / Make / API / MCP).
// Cobrem as 4 frentes pra o formato "ferramenta + complemento" funcionar.
// ---------------------------------------------------------------------------

export const INTEGRACOES: IntegracaoPlaybook[] = [
  // ---- ATENDIMENTO ----
  {
    id: 'atendimento-planilha',
    titulo: 'Bot de atendimento → Google Sheets',
    de: 'bot', para: 'Google Sheets', via: 'nativo', categorias: ['atendimento'],
    quando: 'Você quer um histórico simples de quem falou com o bot e o que pediu, sem CRM ainda.',
    precisaChaveApi: false,
    passos: [
      { titulo: 'Crie a planilha com as colunas certas', detalhe: 'Data, Nome, Contato, Assunto, "Resolvido pelo bot?". Uma linha por conversa.' },
      { titulo: 'Adicione o bloco Google Sheets no fim do fluxo', detalhe: 'No Typebot/ManyChat, conecte a conta Google e escolha a ação "inserir linha".' },
      { titulo: 'Mapeie as variáveis do fluxo pras colunas', detalhe: 'Ligue nome, contato e assunto que o bot coletou aos campos da planilha.' },
      { titulo: 'Teste com uma conversa real', detalhe: 'Passe pelo bot e confirme que a linha aparece na hora.' },
    ],
    resultado: 'Cada pessoa que fala com o bot vira uma linha na planilha automaticamente.',
  },
  {
    id: 'atendimento-crm',
    titulo: 'Bot de atendimento → CRM (via Make)',
    de: 'bot', para: 'CRM', via: 'make', categorias: ['atendimento', 'vendas'],
    quando: 'O contato que o bot qualifica precisa cair direto no seu funil de vendas, não numa planilha solta.',
    precisaChaveApi: true,
    passos: [
      { titulo: 'No Make, crie um cenário com gatilho Webhook', detalhe: '"Webhooks → Custom webhook". Copie a URL gerada.' },
      { titulo: 'No bot, envie os dados pra esse webhook', detalhe: 'Bloco "HTTP request" (POST) com nome, contato e assunto no corpo.' },
      { titulo: 'No Make, adicione o módulo do seu CRM', detalhe: 'Ex.: "RD Station CRM → criar oportunidade". Conecte com a API key do CRM.' },
      { titulo: 'Ligue os campos e teste', detalhe: '"Run once", passe pelo bot, e veja a oportunidade no funil já na etapa certa.' },
    ],
    resultado: 'Todo lead que o bot qualifica entra no CRM com o contexto da conversa anexado.',
  },
  {
    id: 'atendimento-ia-aberta',
    titulo: 'Bot → ChatGPT / Claude via API (responder o que sai do roteiro)',
    de: 'bot', para: 'OpenAI ou Anthropic (API)', via: 'api', categorias: ['atendimento'],
    quando: 'O bot dá conta do menu, mas trava quando a pergunta é aberta ("vocês atendem tal caso?").',
    precisaChaveApi: true,
    passos: [
      { titulo: 'Pegue uma chave de API', detalhe: 'platform.openai.com ou console.anthropic.com. Guarde como senha — gera custo por uso.' },
      { titulo: 'Use o bloco de IA do bot (ou HTTP request)', detalhe: 'Typebot tem bloco OpenAI nativo. Cole a chave.' },
      { titulo: 'Escreva um prompt de sistema curto e específico', detalhe: '"Você é o atendente da [empresa]. Responda só sobre [X]. Se não souber, diga que vai passar pra uma pessoa. Máx 3 frases."' },
      { titulo: 'Coloque teto de gasto e mantenha o fallback humano', detalhe: 'Limite de uso na conta da API + botão "falar com uma pessoa" sempre visível.' },
    ],
    resultado: 'O bot responde com contexto no que foge do roteiro, sem deixar de escalar pra humano.',
  },

  // ---- VENDAS ----
  {
    id: 'crm-email',
    titulo: 'CRM → ferramenta de e-mail (nutrição automática)',
    de: 'CRM', para: 'e-mail (Brevo / RD Station Mkt)', via: 'nativo', categorias: ['vendas'],
    quando: 'Você já tem CRM e quer que o lead que entra numa etapa receba a sequência de e-mails certa sozinho.',
    precisaChaveApi: false,
    passos: [
      { titulo: 'Conecte as duas contas', detalhe: 'Via integração nativa (RD Station CRM ↔ RD Station Mkt é direto) ou Make/Zapier: "lead mudou de etapa" → "adicionar à lista X".' },
      { titulo: 'Crie uma lista por etapa/interesse', detalhe: 'Ex.: "Reunião marcada", "Proposta enviada". Cada lista tem a sua sequência.' },
      { titulo: 'Monte a automação de e-mail na ferramenta de e-mail', detalhe: 'Entrada na lista → série de 3–5 e-mails com esperas.' },
      { titulo: 'Feche o ciclo de volta', detalhe: 'Quem responde/clica volta pro CRM como tarefa "retomar contato".' },
    ],
    resultado: 'O lead recebe o e-mail certo pra etapa em que está, sem você lembrar de mandar.',
  },
  {
    id: 'crm-whatsapp',
    titulo: 'CRM → WhatsApp (follow-up automático)',
    de: 'CRM', para: 'WhatsApp', via: 'make', categorias: ['vendas'],
    quando: 'O follow-up do seu funil precisa sair no WhatsApp, não no e-mail — mas você não quer trocar de CRM.',
    precisaChaveApi: true,
    passos: [
      { titulo: 'Escolha o provedor de WhatsApp API', detalhe: 'Ex.: Z-API, 360dialog ou a Cloud API da Meta. Pegue o token.' },
      { titulo: 'No Make, gatilho "negócio sem movimento há X dias"', detalhe: 'Módulo do CRM que lista oportunidades paradas numa etapa.' },
      { titulo: 'Ação: enviar mensagem de WhatsApp', detalhe: 'Template aprovado (a Meta exige) com o nome e o contexto do negócio.' },
      { titulo: 'Registre a mensagem de volta no CRM', detalhe: 'Anote no card "follow-up enviado em [data]" pra não repetir.' },
    ],
    resultado: 'Oportunidade parada recebe um toque no WhatsApp automaticamente, e fica registrado no funil.',
  },
  {
    id: 'form-crm',
    titulo: 'Formulário do site → CRM',
    de: 'Formulário', para: 'CRM', via: 'nativo', categorias: ['vendas'],
    quando: 'Lead que preenche formulário no site hoje cai no seu e-mail e às vezes se perde.',
    precisaChaveApi: false,
    passos: [
      { titulo: 'Use um formulário que integra', detalhe: 'RD Station, Typeform, Tally ou o nativo do CRM. Evite formulário "solto" que só manda e-mail.' },
      { titulo: 'Ligue direto no CRM (ou via Make)', detalhe: 'Envio do formulário → cria oportunidade na etapa "Novo".' },
      { titulo: 'Preencha origem e campanha', detalhe: 'Campo "origem = site / campanha X" pra medir de onde vem lead bom.' },
      { titulo: 'Dispare a tarefa de primeiro contato', detalhe: 'Regra no CRM: novo lead → tarefa "responder em até 1h".' },
    ],
    resultado: 'Todo formulário vira oportunidade no funil, com origem marcada e prazo de resposta.',
  },

  // ---- OPERAÇÃO ----
  {
    id: 'automacao-planilha',
    titulo: 'Automação ↔ planilha (relatório / consolidação)',
    de: 'Make/Zapier', para: 'Google Sheets', via: 'make', categorias: ['operacao'],
    quando: 'Você monta o mesmo relatório toda semana copiando dado de vários lugares pra uma planilha.',
    precisaChaveApi: false,
    passos: [
      { titulo: 'Liste as fontes do relatório', detalhe: 'Quais apps/planilhas, quais números, em que ordem você junta hoje.' },
      { titulo: 'Cenário agendado no Make', detalhe: 'Gatilho "toda sexta 8h" → módulos que leem cada fonte → escrevem numa aba consolidada.' },
      { titulo: 'Gere o resumo com IA (opcional)', detalhe: 'Módulo OpenAI: "resuma esses números em 5 bullets executivos".' },
      { titulo: 'Entregue', detalhe: 'E-mail/Slack com a planilha e o resumo, no mesmo horário toda semana.' },
    ],
    resultado: 'O relatório que você fazia na sexta chega pronto, sozinho.',
  },
  {
    id: 'automacao-ia',
    titulo: 'Automação → IA via API (decidir, não só mover)',
    de: 'Make/Zapier', para: 'OpenAI / Claude (API)', via: 'api', categorias: ['operacao'],
    quando: 'Sua automação precisa classificar, resumir ou validar algo — não só copiar de A pra B.',
    precisaChaveApi: true,
    passos: [
      { titulo: 'Identifique o ponto de decisão', detalhe: 'Ex.: "classificar este e-mail como suporte / vendas / financeiro".' },
      { titulo: 'Adicione o módulo de IA no meio do fluxo', detalhe: 'Entrada: o texto. Prompt: a regra de classificação. Saída: só a categoria, formato fixo.' },
      { titulo: 'Ramifique pelo resultado', detalhe: '"Router" do Make: cada categoria segue pra um caminho diferente.' },
      { titulo: 'Teto e fallback', detalhe: 'Limite de gasto na API + caminho "não classificado" que cai pra revisão humana.' },
    ],
    resultado: 'A automação passa a tomar a decisão simples que hoje exige você olhar.',
  },
  {
    id: 'planilha-airtable',
    titulo: 'Planilha → Airtable (base de verdade)',
    de: 'Google Sheets', para: 'Airtable', via: 'nativo', categorias: ['operacao'],
    quando: 'A planilha virou fonte de dado de várias automações e começou a quebrar/ficar lenta.',
    precisaChaveApi: false,
    passos: [
      { titulo: 'Modele as tabelas no Airtable', detalhe: 'Uma tabela por entidade, com relações. Não copie a planilha "plana".' },
      { titulo: 'Migre os dados', detalhe: 'Importe cada aba; ajuste os tipos de campo.' },
      { titulo: 'Aponte as automações pro Airtable', detalhe: 'Troque o módulo "Google Sheets" por "Airtable" no Make/Zapier.' },
      { titulo: 'Congele a planilha antiga', detalhe: 'Deixe como leitura por 2 semanas, depois arquive.' },
    ],
    resultado: 'As automações passam a ler de uma base estável, com tipos e relações de verdade.',
  },

  // ---- FINANCEIRO ----
  {
    id: 'cobranca-previsao',
    titulo: 'Cobrança → planilha/Looker (previsão de caixa)',
    de: 'Asaas / Cora', para: 'Google Sheets + Looker Studio', via: 'make', categorias: ['financeiro'],
    quando: 'Você tem a cobrança automática rodando, mas ainda não sabe quanto vai entrar nas próximas semanas.',
    precisaChaveApi: true,
    passos: [
      { titulo: 'Puxe as cobranças pra uma planilha', detalhe: 'Make: gatilho "nova cobrança / status mudou" → linha na aba "Recebíveis" (valor, vencimento, status).' },
      { titulo: 'Adicione as contas a pagar', detalhe: 'Uma aba "A pagar" (manual ou do seu banco/Conta Simples).' },
      { titulo: 'Monte a projeção', detalhe: 'Fórmula que soma recebíveis previstos − a pagar, por semana.' },
      { titulo: 'Conecte no Looker Studio', detalhe: 'Gráfico de saldo projetado por semana. Atualiza sozinho quando a planilha muda.' },
    ],
    resultado: 'Um painel de "quanto vou ter em caixa nas próximas 4 semanas" que se atualiza sozinho.',
  },
  {
    id: 'cobranca-crm',
    titulo: 'Pagamento confirmado → CRM / planilha de clientes',
    de: 'Asaas / Vindi', para: 'CRM ou planilha', via: 'nativo', categorias: ['financeiro', 'vendas'],
    quando: 'Quando o cliente paga, alguém ainda atualiza status na mão em outro lugar.',
    precisaChaveApi: false,
    passos: [
      { titulo: 'Ative o webhook de "pagamento confirmado"', detalhe: 'No Asaas/Vindi, aponte o webhook pro Make/Zapier.' },
      { titulo: 'Atualize o registro do cliente', detalhe: '"Marcar oportunidade como Ganha" no CRM, ou "status = adimplente" na planilha.' },
      { titulo: 'Dispare o que depende do pagamento', detalhe: 'Ex.: liberar acesso, enviar nota fiscal, mandar e-mail de boas-vindas.' },
      { titulo: 'Trate o "não pago"', detalhe: 'Webhook de atraso → tarefa de cobrança / bloqueio.' },
    ],
    resultado: 'Pagou, tudo se atualiza sozinho. Atrasou, a cobrança começa sozinha.',
  },
];

export function integracoesDaCategoria(categoria: Categoria): IntegracaoPlaybook[] {
  return INTEGRACOES.filter((i) => i.categorias.includes(categoria));
}
