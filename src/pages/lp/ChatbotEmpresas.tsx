import LandingLayout, { type FaqItem } from './LandingLayout';

const faq: FaqItem[] = [
  {
    pergunta: 'Chatbot para empresa custa caro?',
    resposta:
      'Depende do escopo. Um chatbot simples de FAQ no WhatsApp roda a partir de R$ 100–300/mês em plataformas como Blip, ManyChat ou Botpress. Chatbots com IA generativa (que respondem em linguagem natural) começam em R$ 300–800/mês, mais o consumo do modelo. Para PMEs, o custo total costuma ficar entre R$ 500 e R$ 2.000/mês incluindo integração com o CRM.',
  },
  {
    pergunta: 'Qual a diferença entre chatbot e agente de IA?',
    resposta:
      'Um chatbot tradicional segue um fluxo de decisões pré-definido: se o cliente digita X, ele responde Y. Um agente de IA usa um modelo generativo que entende linguagem natural, consulta seus dados e escolhe a próxima ação sozinho — como um funcionário júnior treinado. Chatbots são ótimos para perguntas repetidas; agentes de IA são melhores quando as perguntas variam muito.',
  },
  {
    pergunta: 'Vale a pena ter chatbot no WhatsApp da minha empresa?',
    resposta:
      'Se você recebe mais de 30–50 mensagens por dia e as perguntas se repetem (horário, preço, endereço, status de pedido), sim — o payback costuma vir em 2 a 3 meses. Se o volume é baixo ou cada conversa é muito consultiva, um atendente humano bem treinado costuma render mais que um chatbot.',
  },
  {
    pergunta: 'Preciso de programador para colocar um chatbot no ar?',
    resposta:
      'Não necessariamente. Plataformas no-code como ManyChat, Blip e Take Blip permitem montar fluxos completos arrastando blocos. Para integrar com CRM ou banco de dados próprio, aí sim vale ter alguém técnico — ou contratar uma implementação de parceiro.',
  },
  {
    pergunta: 'Como saber se um chatbot é o agente certo para minha empresa?',
    resposta:
      'Nosso diagnóstico gratuito de 2 minutos faz 6 perguntas sobre onde seu tempo é gasto e onde vazam clientes. Se o gargalo estiver em atendimento, ele indica chatbot; se estiver em follow-up de vendas ou cobrança, indica outro agente. Assim você não implementa a ferramenta errada.',
  },
];

export default function ChatbotEmpresas() {
  return (
    <LandingLayout
      slug="/chatbot-para-empresas"
      title="Chatbot para empresas: quando vale a pena e quanto custa em 2026"
      metaDescription="Chatbot para empresa: para quais tipos de negócio funciona, custos reais no Brasil (R$ 500–2.000/mês), diferença para agente de IA e como escolher a plataforma. Guia para PMEs."
      h1={<>Chatbot para empresas: <span style={{ color: '#2563eb' }}>quando vale a pena</span> e quanto custa</>}
      intro={
        <>
          Um chatbot bem colocado tira 40 a 70% do peso do atendimento repetitivo — mas
          um chatbot mal colocado só irrita cliente. Este guia mostra em quais
          empresas ele funciona, quanto custa realmente no Brasil, e como decidir
          entre um chatbot de fluxo e um agente de IA generativa.
        </>
      }
      blocos={[
        {
          titulo: 'Quando um chatbot para empresa faz sentido',
          conteudo: (
            <p>
              Chatbot resolve bem três cenários: <strong>atendimento repetitivo</strong>
              {' '}(horário, endereço, preço, status de pedido), <strong>qualificação
              de leads</strong> (perguntar orçamento, prazo e canal antes de passar
              pro vendedor humano) e <strong>agendamento</strong> (marcar consulta
              ou visita técnica sem depender de recepcionista). Se seu negócio
              recebe menos de 20 mensagens por dia ou cada conversa é longa e
              única, um chatbot provavelmente não paga a implantação.
            </p>
          ),
        },
        {
          titulo: 'Chatbot no WhatsApp: o formato mais usado no Brasil',
          conteudo: (
            <p>
              No Brasil, 90% dos chatbots de PME rodam no WhatsApp — não porque é
              melhor tecnicamente, mas porque é onde o cliente já está.
              Plataformas como Blip, Take, ManyChat e Botpress conectam ao WhatsApp
              Business API e permitem responder 24h. O importante é combinar
              chatbot para as perguntas repetidas <strong>com transferência
              humana</strong> quando a conversa fugir do fluxo — sem essa saída
              elegante, o chatbot vira sinônimo de "empresa que não atende".
            </p>
          ),
        },
        {
          titulo: 'Quanto custa um chatbot para empresa (valores reais)',
          conteudo: (
            <>
              <p className="mb-3">
                Faixas típicas para PMEs no Brasil (custo mensal recorrente,
                incluindo plataforma e WhatsApp Business API):
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>
                  <strong>Chatbot básico de FAQ</strong> (10–30 fluxos, sem IA
                  generativa): R$ 150 a R$ 500/mês.
                </li>
                <li>
                  <strong>Chatbot com integração de CRM/estoque</strong>: R$ 500 a
                  R$ 1.500/mês.
                </li>
                <li>
                  <strong>Agente de IA generativa</strong> (responde em linguagem
                  natural, consulta base própria): R$ 800 a R$ 3.000/mês.
                </li>
              </ul>
              <p className="mt-3">
                Some 10–40 horas de implantação inicial (R$ 3.000 a R$ 15.000
                one-time) se você for contratar um parceiro em vez de montar
                internamente.
              </p>
            </>
          ),
        },
        {
          titulo: 'Chatbot ou agente de IA: qual sua empresa precisa primeiro',
          conteudo: (
            <p>
              Se as perguntas dos clientes se repetem muito, chatbot de fluxo
              resolve com custo baixo. Se as perguntas variam bastante e envolvem
              consultar dados do cliente ("qual meu saldo?", "quando chega meu
              pedido?"), agente de IA generativa entrega experiência muito
              melhor — mas com custo 3 a 5x maior e implantação mais delicada.
              A escolha depende do seu tipo de operação. O diagnóstico gratuito
              abaixo indica qual dos dois faz sentido para o seu caso.
            </p>
          ),
        },
      ]}
      faq={faq}
    />
  );
}
