export type Categoria = 'atendimento' | 'vendas' | 'operacao' | 'financeiro';

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
}

const CONTEUDO: Record<Categoria, Omit<ResultadoDiagnostico, 'categoria' | 'porque' | 'avisoToolsGenericas'>> = {
  atendimento: {
    titulo: 'Agente de Atendimento',
    subtitulo: 'Seu maior gargalo está em responder clientes com velocidade e consistência.',
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
    titulo: 'Agente de Vendas e Follow-up',
    subtitulo: 'Seu maior gargalo está em manter o contato com leads quentes sem deixar oportunidade esfriar.',
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
    titulo: 'Agente de Automação e Operação',
    subtitulo: 'Seu maior gargalo está em tarefas repetitivas internas que consomem tempo sem gerar valor direto.',
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
    titulo: 'Agente Financeiro',
    subtitulo: 'Seu maior gargalo está na previsibilidade de caixa e na cobrança manual de clientes.',
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

export function calcularResultado(respostas: Record<number, string>): ResultadoDiagnostico {
  const p1 = respostas[1] ?? '';
  const p2 = respostas[2] ?? '';
  const p3 = respostas[3] ?? '';
  const p4 = respostas[4] ?? '';
  const p5 = respostas[5] ?? '';

  let categoria: Categoria = P1_MAP[p1] ?? 'atendimento';

  // Pequeno time + volume alto de contatos → reforça atendimento, mesmo que P1 seja outro
  const timeMinimo = p2 === 'Só eu' || p2 === '2 a 5 pessoas';
  const altaVolume = p3 === 'Mais de 50';
  if (timeMinimo && altaVolume && categoria !== 'atendimento') {
    categoria = 'atendimento';
  }

  const avisoToolsGenericas = p5 === 'Sim, testei mas não deu certo';

  const conteudo = CONTEUDO[categoria];

  const porqueMap: Record<Categoria, string> = {
    atendimento: `Com base nas suas respostas — especialmente o gargalo principal que você identificou${p4 ? ` e a tarefa que mais consome seu tempo ("${p4}")` : ''} — o ponto crítico está na velocidade e consistência do atendimento. ${timeMinimo && altaVolume ? 'Com um time pequeno e mais de 50 contatos por dia, cada minuto de atraso na resposta é uma oportunidade perdida.' : 'Perder clientes no caminho por demora de resposta é um problema resolvível com automação focada.'}`,
    vendas: `Com base nas suas respostas${p4 ? ` — em especial "${p4}"` : ''} — o gargalo está no acompanhamento de oportunidades que já existem. Leads que ficam sem resposta por mais de 24h têm chance de conversão drasticamente menor. Um agente de follow-up resolve isso sem depender de memória ou disponibilidade.`,
    operacao: `Com base nas suas respostas${p4 ? ` — incluindo "${p4}" como tarefa mais repetitiva` : ''} — o tempo que você perde em processos manuais internos é o maior freio de crescimento. Automatizar operação libera horas semanais para trabalho que realmente precisa de você.`,
    financeiro: `Com base nas suas respostas${p4 ? ` — e na tarefa "${p4}" que você destacou` : ''} — a falta de previsibilidade financeira e a cobrança manual são os maiores riscos para a saúde do negócio. Um agente financeiro resolve o operacional e dá clareza sobre o que entra e quando.`,
  };

  return {
    categoria,
    ...conteudo,
    porque: porqueMap[categoria],
    avisoToolsGenericas,
  };
}
