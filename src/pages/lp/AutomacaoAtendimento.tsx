import LandingLayout, { type FaqItem } from './LandingLayout';

const faq: FaqItem[] = [
  {
    pergunta: 'O que é automação de atendimento?',
    resposta:
      'É qualquer processo que responde, encaminha ou registra atendimento sem exigir digitação humana em cada etapa. Vai desde uma URA de telefone e respostas rápidas no WhatsApp até agentes de IA que respondem dúvidas complexas e abrem chamado no sistema sozinhos.',
  },
  {
    pergunta: 'Automação de atendimento no WhatsApp funciona para pequenas empresas?',
    resposta:
      'Sim, e é onde o payback aparece mais rápido. Se sua PME recebe 30+ mensagens/dia com perguntas repetidas (horário, preço, status), automatizar as respostas cobre a implantação em 2–3 meses. Abaixo desse volume, um atendente bem treinado costuma render mais.',
  },
  {
    pergunta: 'Qual a diferença entre automação de atendimento e chatbot?',
    resposta:
      'Chatbot é uma das formas de automação (a mais visível). Automação de atendimento é o conceito maior: pode incluir roteamento inteligente, classificação de tickets, resposta sugerida para atendente humano, transcrição de áudio, disparo automático de pesquisas de satisfação. Chatbot é o "front" — o resto acontece no bastidor.',
  },
  {
    pergunta: 'Automação vai substituir meus atendentes?',
    resposta:
      'Nas PMEs que implantamos, o padrão é diferente: automação absorve 50–70% do volume repetitivo e libera o atendente humano para casos consultivos, onde ele fecha mais venda ou salva mais cliente. Costuma aumentar o faturamento por atendente, não reduzir o time.',
  },
  {
    pergunta: 'Como começar sem gastar muito?',
    resposta:
      'Comece mapeando as 10 perguntas mais repetidas que seu time responde no WhatsApp esta semana. Se 6 ou mais aparecem toda semana, automatizar essas 6 já paga a plataforma básica (R$ 200–500/mês). Não tente automatizar tudo de uma vez — o ROI vem da regularidade, não da complexidade.',
  },
];

export default function AutomacaoAtendimento() {
  return (
    <LandingLayout
      slug="/automacao-de-atendimento"
      title="Automação de atendimento: guia prático para PMEs no WhatsApp"
      metaDescription="Automação de atendimento no WhatsApp para pequenas empresas: quando vale, quanto custa, como escolher entre chatbot, agente de IA e roteamento inteligente. Passo a passo."
      h1={<>Automação de atendimento: <span style={{ color: '#4f46e5' }}>o que automatizar primeiro</span> na sua PME</>}
      intro={
        <>
          Automação de atendimento não é "trocar humano por robô" — é tirar o
          humano das perguntas que se repetem, para que ele foque nas que fecham
          venda ou salvam cliente. Este guia mostra o que faz sentido automatizar
          numa pequena empresa, quanto custa e como começar sem gastar mais do
          que precisa.
        </>
      }
      blocos={[
        {
          titulo: 'O que dá para automatizar no atendimento hoje',
          conteudo: (
            <>
              <p className="mb-3">
                Quatro camadas costumam entrar antes de qualquer coisa "avançada":
              </p>
              <ol className="list-decimal pl-6 space-y-1.5">
                <li>
                  <strong>Respostas rápidas</strong> — horário, endereço, formas
                  de pagamento, prazos padrão.
                </li>
                <li>
                  <strong>Consulta de status</strong> — pedido, agendamento,
                  boleto, entrega.
                </li>
                <li>
                  <strong>Qualificação inicial</strong> — quais perguntas o
                  cliente responde antes de falar com vendedor?
                </li>
                <li>
                  <strong>Roteamento</strong> — mandar cliente certo pro time
                  certo (SAC, comercial, financeiro) sem precisar do humano
                  redirecionando.
                </li>
              </ol>
            </>
          ),
        },
        {
          titulo: 'Atendimento automatizado no WhatsApp: por onde começar',
          conteudo: (
            <p>
              O caminho mais barato para PME é: <strong>WhatsApp Business API</strong>
              {' '}(oficial, não a versão grátis) + <strong>plataforma
              conversacional</strong> (Blip, Take, ManyChat, Botpress, Chatwoot) +
              1 semana mapeando as 20 perguntas mais frequentes. Com isso já dá
              pra automatizar 40–60% do volume. Só depois pense em agente de IA
              generativa — que é mais poderoso, mas 3–5x mais caro e mais
              trabalhoso de treinar.
            </p>
          ),
        },
        {
          titulo: 'Quando automação NÃO é a resposta',
          conteudo: (
            <p>
              Se cada cliente seu tem uma história diferente e o valor do ticket
              é alto (consultoria, imóvel, B2B enterprise), automatizar o
              atendimento pode destruir taxa de conversão. Nesses casos o
              melhor uso de IA é <strong>agente de vendas interno</strong>
              {' '}(que ajuda o vendedor humano a fazer follow-up e escrever
              propostas) — não chatbot pra cliente. O diagnóstico gratuito
              abaixo identifica se seu negócio está no perfil "automatizar
              atendimento" ou "turbinar vendas".
            </p>
          ),
        },
        {
          titulo: 'Custos reais de automação de atendimento no Brasil',
          conteudo: (
            <p>
              Para uma PME que recebe 500–3.000 mensagens/mês pelo WhatsApp,
              conte com R$ 300 a R$ 1.500/mês em plataforma + WhatsApp API, mais
              R$ 3.000 a R$ 10.000 de implantação inicial se contratar parceiro.
              O ROI aparece quando você consegue medir: quantas mensagens o
              atendente humano <em>não</em> precisou responder no mês? Se esse
              número for maior que o custo total, a automação está pagando —
              simples assim.
            </p>
          ),
        },
      ]}
      faq={faq}
    />
  );
}
