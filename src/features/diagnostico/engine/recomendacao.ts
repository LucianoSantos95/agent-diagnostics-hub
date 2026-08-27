export type Categoria = 'atendimento' | 'vendas' | 'operacao' | 'financeiro';
export type PerfilExperiencia = 'iniciante' | 'testou-falhou' | 'ja-usa';
export type Confianca = 'alta' | 'media' | 'baixa';

/**
 * Formato da recomendação — decide o que a tela de resultado mostra.
 * O complemento SÓ existe quando há necessidade real (a pessoa já tem outro
 * sistema pra ligar), nunca por padrão.
 */
export type Forma = 'uma-ferramenta' | 'ferramenta-mais-complemento' | 'agente' | 'validar';

export const FORMA_LABEL: Record<Forma, string> = {
  'uma-ferramenta': 'uma ferramenta',
  'ferramenta-mais-complemento': 'ferramenta + complemento',
  agente: 'agente sob medida',
  validar: 'validar antes',
};

/** Como a pessoa trabalha — define vocabulário e ranqueamento das ferramentas. */
export type Perfil = 'autonomo' | 'consultor' | 'agencia' | 'empresa';

export const PERFIL_LABEL: Record<Perfil, string> = {
  autonomo: 'autônomo / freelancer',
  consultor: 'consultor',
  agencia: 'agência',
  empresa: 'empresa com time',
};

const PERFIL_MAP: Record<string, Perfil> = {
  'Autônomo ou freelancer — sou eu que faço e entrego': 'autonomo',
  'Consultor — presto serviço recorrente pra alguns clientes': 'consultor',
  'Agência — tenho um time entregando pra vários clientes': 'agencia',
  'Empresa com time — operação interna com funcionários': 'empresa',
};

export function classificarPerfil(resposta: string): Perfil {
  return PERFIL_MAP[resposta] ?? 'empresa';
}

export interface Ferramenta {
  nome: string;
  url: string;
  descricao: string;
  plano: string;
}

export interface ResultadoDiagnostico {
  categoria: Categoria;
  titulo: string;
  subtitulo: string;
  porque: string;
  oQuePrecisa: string;
  ondeEncontrar: string;
  ferramentas: Ferramenta[];
  comoComecar: string;
  errosComuns: string;
  avisoToolsGenericas: boolean;
  perfilExperiencia: PerfilExperiencia;
  perfil: Perfil;
  perfilLabel: string;
  jaUsa: string[];
  metaTresMeses: string;
  pontePessoal: string;
  confianca: Confianca;
  confiancaExplicacao: string;
  /** Formato da recomendação (ver type Forma). */
  forma: Forma;
  /** Quando forma = 'ferramenta-mais-complemento': o que ligar ("o CRM que você já usa"). */
  complementoLabel: string;
  /** Frase que explica por que essa forma (usada no subheadline de 'agente'/'validar'). */
  formaMotivo: string;
}

type ConteudoBase = Omit<
  ResultadoDiagnostico,
  | 'categoria'
  | 'porque'
  | 'avisoToolsGenericas'
  | 'perfilExperiencia'
  | 'perfil'
  | 'perfilLabel'
  | 'jaUsa'
  | 'metaTresMeses'
  | 'pontePessoal'
  | 'confianca'
  | 'confiancaExplicacao'
  | 'forma'
  | 'complementoLabel'
  | 'formaMotivo'
  | 'titulo'
  | 'subtitulo'
>;

const NOME_AGENTE: Record<Categoria, string> = {
  atendimento: 'Agente de Atendimento',
  vendas: 'Agente de Vendas e Follow-up',
  operacao: 'Agente de Automação e Operação',
  financeiro: 'Agente Financeiro',
};

const NOME_FRENTE: Record<Categoria, string> = {
  atendimento: 'atendimento ao cliente',
  vendas: 'vendas e follow-up',
  operacao: 'operação interna',
  financeiro: 'gestão financeira',
};

const SUBTITULO: Record<Categoria, string> = {
  atendimento: 'Seu maior gargalo está em responder clientes com velocidade e consistência.',
  vendas: 'Seu maior gargalo está em manter o contato com leads quentes sem deixar oportunidade esfriar.',
  operacao: 'Seu maior gargalo está em tarefas repetitivas internas que consomem tempo sem gerar valor direto.',
  financeiro: 'Seu maior gargalo está na previsibilidade de caixa e na cobrança manual de clientes.',
};

const CONTEUDO: Record<Categoria, ConteudoBase> = {
  atendimento: {
    oQuePrecisa: `Um agente de atendimento automatiza respostas para as dúvidas mais frequentes dos seus clientes — via WhatsApp, Instagram ou chat no site — sem precisar de um humano disponível 24h. Ele responde na hora, filtra o que precisa de atenção real e só escala para você o que não consegue resolver. O resultado prático: menos tempo perdido em perguntas repetitivas e nenhum cliente ignorado por demora.`,
    ferramentas: [
      { nome: 'Typebot', url: 'https://typebot.io', descricao: 'Fluxos de conversa visuais + WhatsApp', plano: 'Gratuito' },
      { nome: 'ManyChat', url: 'https://manychat.com', descricao: 'Automação de DM no Instagram', plano: 'Gratuito' },
      { nome: 'Tidio', url: 'https://tidio.com', descricao: 'Chat com IA para sites', plano: 'Gratuito' },
    ],
    ondeEncontrar: `Nenhuma dessas ferramentas exige programação para começar. A curva de aprendizado é de 1 a 2 semanas. Para integração com WhatsApp, o Typebot é o ponto de entrada mais rápido no Brasil.`,
    comoComecar: `1. Liste as 10 perguntas que você mais recebe dos clientes hoje (por WhatsApp, e-mail ou DM)
2. Escolha uma plataforma gratuita (Typebot ou ManyChat) e monte um fluxo respondendo só essas 10 perguntas
3. Teste você mesmo o fluxo como se fosse um cliente antes de ativar
4. Ative apenas para novos contatos e monitore por 7 dias antes de expandir

Você não precisa automatizar tudo de uma vez — comece pelo que mais repete.`,
    errosComuns: `- **Automatizar antes de mapear**: criar o bot sem saber quais perguntas chegam de verdade → o fluxo fica fora da realidade
- **Fluxo sem saída humana**: bot que nunca transfere para uma pessoa → cliente preso em loop e frustrado
- **Linguagem robótica**: mensagens formais demais ou genéricas → queda de engajamento
- **Não monitorar**: ativar e esquecer → falhas acumulam sem que ninguém perceba`,
  },
  vendas: {
    oQuePrecisa: `Um agente de vendas e follow-up automatiza a sequência de contatos com leads que já demonstraram interesse — mandando a mensagem certa, no momento certo, sem depender da sua memória ou disponibilidade. Ele identifica quem parou de responder, reativa contatos frios e libera você para focar nas negociações que realmente precisam de atenção humana.`,
    ferramentas: [
      { nome: 'RD Station CRM', url: 'https://www.rdstation.com/crm/', descricao: 'CRM brasileiro com follow-up', plano: 'Gratuito' },
      { nome: 'Kommo', url: 'https://www.kommo.com', descricao: 'Pipeline + automação WhatsApp', plano: 'Teste 14 dias' },
      { nome: 'Pipedrive', url: 'https://pipedrive.com', descricao: 'Pipeline visual para times pequenos', plano: 'Teste 14 dias' },
    ],
    ondeEncontrar: `Todas oferecem período de teste gratuito de 14 a 30 dias. Para times pequenos brasileiros que já usam WhatsApp, o Kommo tem a integração mais direta.`,
    comoComecar: `1. Mapeie seu funil atual: quais etapas existem do primeiro contato até a venda fechada?
2. Identifique em qual etapa os leads param de responder (é aqui que o agente entra)
3. Crie uma sequência simples: contato inicial → follow-up em 48h → reativação em 7 dias
4. Use um CRM com automação (RD Station ou Kommo) para executar essa sequência sem intervenção manual

Comece com 1 sequência, não 10.`,
    errosComuns: `- **Follow-up genérico**: mensagens iguais para todos os leads → baixa taxa de resposta
- **Frequência excessiva**: contatos diários → lead marca como spam ou bloqueia
- **Sem contexto**: mensagem que não referencia a conversa anterior → parece automação óbvia
- **Automatizar sem CRM**: usar planilha para controlar follow-up → inevitavelmente perde contatos`,
  },
  operacao: {
    oQuePrecisa: `Um agente de automação operacional conecta sistemas, move dados entre ferramentas e executa tarefas repetitivas sem precisar de ninguém para apertar o botão. Relatórios que você gera manualmente toda semana, notificações que você envia por fora, dados que você copia de uma planilha para outra — tudo isso pode rodar sozinho, em horário programado ou acionado por um evento.`,
    ferramentas: [
      { nome: 'Make', url: 'https://make.com', descricao: 'Automação visual entre centenas de apps', plano: 'Grátis 1k ops/mês' },
      { nome: 'n8n', url: 'https://n8n.io', descricao: 'Open source, sem limite de operações', plano: 'Open source' },
      { nome: 'Zapier', url: 'https://zapier.com', descricao: '+6.000 integrações, o mais popular', plano: 'Grátis 100 tasks' },
    ],
    ondeEncontrar: `Para começar sem programação, Make ou Zapier são os mais acessíveis. O n8n é ideal para quem quer controle total sem pagar por uso.`,
    comoComecar: `1. Escolha UMA tarefa repetitiva que você faz toda semana (ex: gerar relatório, enviar confirmação, mover dados entre planilhas)
2. Mapeie o passo a passo manual dessa tarefa (quais apps envolvidos, em que ordem)
3. Crie um fluxo no Make ou Zapier replicando esses passos
4. Rode o fluxo em paralelo com o processo manual por 1 semana antes de desligar o manual

Automatize uma tarefa de cada vez. Complexidade acumulada quebra tudo.`,
    errosComuns: `- **Automatizar processo quebrado**: se o processo manual já tem falhas, a automação vai replicá-las em escala
- **Dependência de planilha como banco de dados**: Google Sheets como fonte de dados de automação → instável e lento
- **Sem tratamento de erro**: automação que não notifica quando falha → problema silencioso por dias
- **Over-engineering**: criar fluxo complexo para problema que um lembrete no celular resolveria`,
  },
  financeiro: {
    oQuePrecisa: `Um agente financeiro automatiza o envio de cobranças, lembretes de pagamento e conciliação básica de recebíveis — eliminando o trabalho de perseguir clientes inadimplentes manualmente e dando visibilidade real sobre o que entra e quando. Não substitui um contador, mas resolve o operacional financeiro que hoje consome seu tempo.`,
    ferramentas: [
      { nome: 'Asaas', url: 'https://asaas.com', descricao: 'Cobranças automáticas: boleto, PIX, cartão', plano: 'Gratuito' },
      { nome: 'Vindi', url: 'https://vindi.com.br', descricao: 'Recorrência e mensalidades', plano: 'Sob consulta' },
      { nome: 'Conta Simples', url: 'https://contasimples.com', descricao: 'Conta PJ + categorização automática', plano: 'Gratuito' },
    ],
    ondeEncontrar: `Para cobrança automática no Brasil, o Asaas é o ponto de entrada mais direto — tem plano gratuito, aceita PIX, boleto e cartão, e já inclui régua de cobrança embutida.`,
    comoComecar: `1. Liste todos os clientes que te devem hoje e o status de cada cobrança
2. Crie uma conta no Asaas (gratuito) e importe esses clientes
3. Configure uma régua de cobrança: lembrete 3 dias antes do vencimento + no dia + 3 dias depois
4. Ative o PIX automático para novos clientes e monitore o primeiro ciclo completo

A régua de cobrança sozinha já elimina boa parte do trabalho manual.`,
    errosComuns: `- **Cobrança agressiva sem relacionamento**: mensagens automáticas frias → deteriora a relação com o cliente
- **Não categorizar despesas**: receber bem mas não saber onde gasta → caixa positivo com surpresas no fim do mês
- **Previsão de caixa por planilha**: atualização manual → sempre desatualizada na hora que precisa
- **Ignorar inadimplência até virar problema**: sem régua → percebe só quando o fluxo já está comprometido`,
  },
};

const P1_MAP: Record<string, Categoria> = {
  'Atendimento ao cliente — demoro para responder, perco gente no caminho': 'atendimento',
  'Vendas e follow-up — esqueço de cobrar resposta, perco oportunidade': 'vendas',
  'Operação interna — processo manual, retrabalho, tarefa repetitiva': 'operacao',
  'Financeiro — não sei prever caixa, cobrança de cliente é manual': 'financeiro',
};

const NOME_CATEGORIA: Record<Categoria, string> = {
  atendimento: 'atendimento',
  vendas: 'vendas e follow-up',
  operacao: 'operação interna',
  financeiro: 'financeiro',
};

const PONTE_META: Record<Categoria, string> = {
  atendimento: 'Um agente de atendimento é o caminho mais curto até lá — libera as horas que hoje somem respondendo o mesmo tipo de mensagem.',
  vendas: 'Um agente de follow-up encurta esse caminho — mantém o contato quente sem depender da sua memória, para você chegar lá com pipeline cheio.',
  operacao: 'Automatizar operação libera exatamente as horas semanais que hoje somem no repetitivo — é o que te tira de operador para dono.',
  financeiro: 'Um agente financeiro cria previsibilidade — sem isso, essa meta fica sempre a um mês de distância.',
};

// Palavras-chave por categoria — usadas pra medir se a P4 (tarefa livre) confirma a P1.
const KEYWORDS: Record<Categoria, RegExp[]> = {
  atendimento: [
    /respond/i, /atend/i, /client/i, /whats?app/i, /instagram|dm\b|direct/i,
    /d[uú]vida/i, /suporte/i, /chat/i, /mensagem/i,
  ],
  vendas: [
    /lead/i, /follow[- ]?up/i, /proposta/i, /or[çc]amento/i, /cotar|cota[çc][aã]o/i,
    /vend/i, /prospect/i, /cobrar resposta/i, /fechar/i, /pipeline|funil/i,
  ],
  operacao: [
    /planilha/i, /relat[oó]rio/i, /cadastr/i, /copiar|copio|copia/i, /processo/i,
    /repetitiv/i, /dado|dados/i, /import(a|ar)/i, /export(a|ar)/i, /integr/i,
    /nota fiscal|nfe/i,
  ],
  financeiro: [
    /cobran[çc]/i, /boleto/i, /pix/i, /caixa/i, /inadimpl/i, /fluxo de caixa/i,
    /fatura/i, /pag(a|amento)/i, /recebiv/i, /financ/i, /conta[s]? a (pagar|receber)/i,
  ],
};

function truncar(texto: string, max: number): string {
  const limpo = texto.trim();
  return limpo.length > max ? `${limpo.slice(0, max).trimEnd()}…` : limpo;
}

/** Deriva o nível de experiência a partir do que a pessoa marcou que já usa. */
function classificarExperiencia(jaUsaRaw: string): PerfilExperiencia {
  const s = (jaUsaRaw ?? '').toLowerCase();
  if (/n[aã]o engatou|testei.*n[aã]o|desisti/.test(s)) return 'testou-falhou';
  if (!s.trim() || /nada ainda|primeira vez/.test(s)) return 'iniciante';
  return 'ja-usa';
}

/** Quebra a resposta multi-seleção "o que já usa" numa lista de rótulos limpos. */
export function parseJaUsa(jaUsaRaw: string): string[] {
  return (jaUsaRaw ?? '')
    .split(/\s*[;|]\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !/nada ainda|primeira vez|n[aã]o engatou/i.test(s));
}

// ---------------------------------------------------------------------------
// FORMA da recomendação
// ---------------------------------------------------------------------------

// Grupos do que a pessoa já usa (resposta P7). "iaGeral"/"planilha" são
// candidatos a COMPLEMENTO; os 4 primeiros casam 1:1 com uma frente.
const GRUPO_JA_USA: Record<'atendimento' | 'vendas' | 'operacao' | 'financeiro' | 'iaGeral' | 'planilha', RegExp> = {
  atendimento: /chatbot|atendimento|manychat|typebot|tidio/i,
  vendas: /\bcrm\b|rd station|pipedrive|hubspot|kommo/i,
  operacao: /automa[çc][aã]o|\bmake\b|zapier|n8n/i,
  financeiro: /cobran[çc]a|asaas|cora|vindi/i,
  iaGeral: /chatgpt|gemini|claude|copilot/i,
  planilha: /planilha|sheets|excel/i,
};

function usaGrupo(jaUsa: string[], grupo: keyof typeof GRUPO_JA_USA): boolean {
  return jaUsa.some((s) => GRUPO_JA_USA[grupo].test(s));
}

/** Rótulo do sistema que a pessoa já tem e que serve de complemento à ferramenta-base. */
function rotuloComplemento(jaUsa: string[], categoria: Categoria): string {
  if (usaGrupo(jaUsa, 'vendas') && categoria !== 'vendas') return 'o CRM que você já usa';
  if (usaGrupo(jaUsa, 'operacao')) return 'a automação que você já usa (Make/Zapier)';
  if (usaGrupo(jaUsa, 'planilha') && (categoria === 'operacao' || categoria === 'financeiro')) return 'a planilha que você já usa';
  if (usaGrupo(jaUsa, 'iaGeral') && categoria === 'operacao') return 'a IA que você já usa (via API)';
  if (usaGrupo(jaUsa, 'financeiro') && categoria !== 'financeiro') return 'a ferramenta de cobrança que você já usa';
  return '';
}

function classificarForma(args: {
  categoria: Categoria;
  confianca: Confianca;
  confiancaExplicacao: string;
  jaUsa: string[];
  perfilExperiencia: PerfilExperiencia;
  time: string;
  volume: string;
}): { forma: Forma; complementoLabel: string; formaMotivo: string } {
  const { categoria, confianca, confiancaExplicacao, jaUsa, perfilExperiencia, time, volume } = args;

  // 1. Respostas se contradizem → não prescrever, validar.
  if (confianca === 'baixa') {
    return { forma: 'validar', complementoLabel: '', formaMotivo: confiancaExplicacao };
  }

  // 2. Sinais de "agente sob medida".
  const timeGrande = time === '6 a 20 pessoas' || time === 'Mais de 20 pessoas';
  const volumeAlto = volume === 'Mais de 50';
  if (usaGrupo(jaUsa, categoria)) {
    return {
      forma: 'agente',
      complementoLabel: '',
      formaMotivo: 'Você já usa ferramenta nessa frente e o gargalo continua — o problema não é a ferramenta, é a configuração pro seu processo.',
    };
  }
  if (timeGrande && volumeAlto) {
    return {
      forma: 'agente',
      complementoLabel: '',
      formaMotivo: 'No seu volume de contatos e tamanho de time, ferramenta de prateleira trava na integração e na manutenção.',
    };
  }
  if (perfilExperiencia === 'testou-falhou' && jaUsa.length >= 1) {
    return {
      forma: 'agente',
      complementoLabel: '',
      formaMotivo: 'Você já testou ferramentas e não engatou. O próximo passo não é outra ferramenta — é desenhar o agente pro seu caso.',
    };
  }

  // 3. Complemento real — só se há outro sistema que casa.
  const comp = rotuloComplemento(jaUsa, categoria);
  if (comp) return { forma: 'ferramenta-mais-complemento', complementoLabel: comp, formaMotivo: '' };

  // 4. Default: uma peça, montar, pronto.
  return { forma: 'uma-ferramenta', complementoLabel: '', formaMotivo: '' };
}

const INTRO_PERFIL: Record<PerfilExperiencia, string> = {
  iniciante: `Como é sua primeira vez com IA, comece pelo mais simples possível — resista ao impulso de montar tudo de uma vez. O objetivo das primeiras 2 semanas é entender a ferramenta funcionando de verdade, não impressionar ninguém.\n\n`,
  'testou-falhou': `Já que uma tentativa anterior não deu certo, o ponto de virada aqui é escopo: rode um único caso de uso ponta a ponta antes de expandir. A maioria das tentativas falha por tentar automatizar cedo demais, coisas demais.\n\n`,
  'ja-usa': `Como você já usa alguma coisa hoje, foque em integração e evolução do que existe — não em recomeçar. Mapeie onde a ferramenta atual entrega valor e onde ela para, e trate esse gap como o próximo agente.\n\n`,
};

interface Sinais {
  p4MatchCategoriaOriginal: number; // matches em P1
  p4MatchOutraCategoria: Categoria | null; // se P4 casa mais com outra categoria
  p4Vago: boolean;
  overrideDisparado: boolean;
}

function contarMatches(p4: string, categoria: Categoria): number {
  if (!p4) return 0;
  return KEYWORDS[categoria].reduce((acc, re) => acc + (re.test(p4) ? 1 : 0), 0);
}

function analisarSinais(p4: string, categoriaOriginal: Categoria, override: boolean): Sinais {
  const p4Trim = p4.trim();
  const p4Vago = p4Trim.length < 15;

  const matchesOriginal = contarMatches(p4Trim, categoriaOriginal);

  // Categoria com maior match em P4 (fora a original)
  let melhorOutra: Categoria | null = null;
  let melhorScore = 0;
  (Object.keys(KEYWORDS) as Categoria[]).forEach((cat) => {
    if (cat === categoriaOriginal) return;
    const m = contarMatches(p4Trim, cat);
    if (m > melhorScore) { melhorScore = m; melhorOutra = cat; }
  });

  const p4MatchOutraCategoria = melhorOutra && melhorScore > matchesOriginal ? melhorOutra : null;

  return {
    p4MatchCategoriaOriginal: matchesOriginal,
    p4MatchOutraCategoria,
    p4Vago,
    overrideDisparado: override,
  };
}

function classificarConfianca(sinais: Sinais): { nivel: Confianca; explicacao: string } {
  const { p4MatchCategoriaOriginal, p4MatchOutraCategoria, p4Vago, overrideDisparado } = sinais;

  if (overrideDisparado) {
    return {
      nivel: 'baixa',
      explicacao: 'Seu gargalo declarado difere do que o volume/time indica como prioridade real. Trate esse resultado como hipótese e valide antes de investir.',
    };
  }
  if (p4MatchOutraCategoria) {
    return {
      nivel: 'baixa',
      explicacao: `A tarefa que você descreveu como mais consumidora aponta mais pra ${NOME_FRENTE[p4MatchOutraCategoria]} do que pro gargalo que marcou. Vale revalidar qual é a dor prioritária.`,
    };
  }
  if (p4MatchCategoriaOriginal >= 2) {
    return {
      nivel: 'alta',
      explicacao: 'Suas respostas convergem: gargalo declarado, tarefa que consome tempo e contexto do time apontam pra mesma frente.',
    };
  }
  if (p4MatchCategoriaOriginal === 1 && !p4Vago) {
    return {
      nivel: 'alta',
      explicacao: 'A tarefa que consome seu tempo confirma o gargalo que você marcou.',
    };
  }
  if (p4Vago) {
    return {
      nivel: 'media',
      explicacao: 'Seu gargalo está claro, mas a descrição da tarefa foi curta demais pra confirmar. Um bate-papo rápido resolve.',
    };
  }
  return {
    nivel: 'media',
    explicacao: 'Sinais consistentes com o gargalo declarado, mas sem palavras-chave que confirmem por completo.',
  };
}

function montarTitulo(categoria: Categoria, confianca: Confianca): string {
  if (confianca === 'alta') return NOME_AGENTE[categoria];
  if (confianca === 'media') return `Prioridade: ${NOME_FRENTE[categoria]}`;
  return `Hipótese inicial: ${NOME_FRENTE[categoria]}`;
}

function montarSubtitulo(categoria: Categoria, confianca: Confianca): string {
  const base = SUBTITULO[categoria];
  if (confianca === 'baixa') {
    return 'Suas respostas apontam pra mais de uma direção. O caminho abaixo é uma hipótese pra validar — não a resposta definitiva.';
  }
  return base;
}

export function calcularResultado(respostas: Record<number, string>): ResultadoDiagnostico {
  // Numeração das perguntas (v2): 1=perfil, 2=gargalo, 3=time, 4=volume,
  // 5=tarefa livre, 6=meta 3 meses, 7=o que já usa (multi-seleção).
  const perfil = classificarPerfil(respostas[1] ?? '');
  const p1 = respostas[2] ?? '';
  const p2 = respostas[3] ?? '';
  const p3 = respostas[4] ?? '';
  const p4 = respostas[5] ?? '';
  const p6 = respostas[6] ?? '';
  const jaUsaRaw = respostas[7] ?? '';
  const jaUsa = parseJaUsa(jaUsaRaw);

  const categoriaOriginal: Categoria = P1_MAP[p1] ?? 'atendimento';
  let categoria: Categoria = categoriaOriginal;

  const timeMinimo = p2 === 'Só eu' || p2 === '2 a 5 pessoas';
  const altaVolume = p3 === 'Mais de 50';
  const overrideAtendimento = timeMinimo && altaVolume && categoriaOriginal !== 'atendimento';
  if (overrideAtendimento) categoria = 'atendimento';

  const perfilExperiencia = classificarExperiencia(jaUsaRaw);
  const avisoToolsGenericas = perfilExperiencia === 'testou-falhou';

  // Análise de confiança usa a categoria original declarada pelo usuário
  const sinais = analisarSinais(p4, categoriaOriginal, overrideAtendimento);
  const { nivel: confianca, explicacao: confiancaExplicacao } = classificarConfianca(sinais);

  const { forma, complementoLabel, formaMotivo } = classificarForma({
    categoria,
    confianca,
    confiancaExplicacao,
    jaUsa,
    perfilExperiencia,
    time: p2,
    volume: p3,
  });

  const conteudo = CONTEUDO[categoria];

  const contextoTime: Record<string, string> = {
    'Só eu': 'Trabalhando sozinho, cada hora gasta em tarefa repetitiva é uma hora que você não gasta crescendo o negócio',
    '2 a 5 pessoas': 'Com um time enxuto de 2 a 5 pessoas, você não tem folga para alocar alguém só nisso',
    '6 a 20 pessoas': 'Com 6 a 20 pessoas, o custo de manter isso manual já pesa na folha e no ritmo da equipe',
    'Mais de 20 pessoas': 'Com mais de 20 pessoas, processos manuais viram gargalo de coordenação e erro em escala',
  };
  const contextoVolume: Record<string, string> = {
    'Menos de 10': 'Mesmo com menos de 10 contatos por dia, a inconsistência é o que custa cliente',
    'Entre 10 e 50': 'Com 10 a 50 contatos por dia, você já está no volume em que o manual começa a vazar',
    'Mais de 50': 'Com mais de 50 contatos por dia, é humanamente impossível manter qualidade sem automação',
  };

  const fraseTime = contextoTime[p2] ?? '';
  const fraseVolume = contextoVolume[p3] ?? '';
  const p4Curto = truncar(p4, 120);

  // ---- Monta `porque` conforme a confiança ----
  const nomeAgente = NOME_AGENTE[categoria];
  const nomeFrente = NOME_FRENTE[categoria];

  let porque = '';

  if (confianca === 'alta') {
    const porqueBase: Record<Categoria, string> = {
      atendimento: `O ponto crítico está na velocidade e consistência do atendimento. ${fraseVolume || fraseTime || 'Perder clientes por demora de resposta é resolvível com automação focada'}.`,
      vendas: `O gargalo está no acompanhamento de oportunidades que já existem. Leads sem resposta por mais de 24h têm chance de conversão drasticamente menor. ${fraseTime || fraseVolume || 'Um agente de follow-up resolve isso sem depender de memória'}.`,
      operacao: `O tempo perdido em processos manuais internos é o maior freio de crescimento. ${fraseTime || fraseVolume || 'Automatizar operação libera horas semanais para o trabalho que precisa de você'}.`,
      financeiro: `A falta de previsibilidade de caixa e a cobrança manual são os maiores riscos para a saúde do negócio. ${fraseTime || 'Um agente financeiro resolve o operacional e dá clareza sobre o que entra e quando'}.`,
    };
    const tarefa = p4Curto ? ` Você destacou "${p4Curto}" como a tarefa que mais consome seu tempo — exatamente o tipo de coisa que o ${nomeAgente} elimina.` : '';
    porque = `${porqueBase[categoria]}${tarefa}`;
  } else if (confianca === 'media') {
    const tarefa = p4Curto ? ` Você destacou "${p4Curto}" como consumidor de tempo — trate essa como a primeira frente.` : '';
    porque = `Suas respostas apontam que a frente de ${nomeFrente} é onde vale começar. ${fraseTime || fraseVolume || ''}${tarefa} Antes de nomear "agente X", vale rodar uma frente de automação nessa direção e ver o que aparece.`.trim();
  } else {
    // baixa
    if (overrideAtendimento) {
      const gargaloTexto = NOME_CATEGORIA[categoriaOriginal];
      porque = `Você marcou ${gargaloTexto} como gargalo, mas com ${p2.toLowerCase()} e ${p3.toLowerCase()} contatos por dia, o atendimento provavelmente é o freio real antes de qualquer outra coisa. É uma hipótese — não uma sentença. O caminho abaixo assume ${nomeFrente} como ponto de partida, mas o mais honesto aqui é validar isso numa conversa antes de escolher ferramenta.`;
    } else if (sinais.p4MatchOutraCategoria) {
      const outra = NOME_FRENTE[sinais.p4MatchOutraCategoria];
      porque = `Você marcou ${NOME_CATEGORIA[categoriaOriginal]} como gargalo, mas a tarefa que descreveu ("${p4Curto}") soa mais como ${outra}. Isso não invalida o diagnóstico — só indica que há duas frentes ativas. O plano abaixo cobre ${nomeFrente}; ${outra} entra como segunda camada.`;
    } else {
      porque = `Suas respostas apontam pra ${nomeFrente}, mas com sinais fracos. Trate o conteúdo abaixo como hipótese de trabalho — as ferramentas gerais que aparecem na sequência já rendem enquanto você valida o gargalo real.`;
    }
  }

  const metaTresMeses = truncar(p6, 220);
  const pontePessoal = PONTE_META[categoria];

  const comoComecar = `${INTRO_PERFIL[perfilExperiencia]}${conteudo.comoComecar}`;

  return {
    categoria,
    titulo: montarTitulo(categoria, confianca),
    subtitulo: montarSubtitulo(categoria, confianca),
    ...conteudo,
    comoComecar,
    porque,
    avisoToolsGenericas,
    perfilExperiencia,
    perfil,
    perfilLabel: PERFIL_LABEL[perfil],
    jaUsa,
    metaTresMeses,
    pontePessoal,
    confianca,
    confiancaExplicacao,
    forma,
    complementoLabel,
    formaMotivo,
  };
}
