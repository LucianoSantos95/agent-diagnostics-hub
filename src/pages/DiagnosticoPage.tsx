import { Helmet } from 'react-helmet-async'
import DiagnosticoFlow from '@/features/diagnostico/DiagnosticoFlow'

const SITE = 'https://diagnostico.focusinteligente.com.br'

const FAQ_ITEMS = [
  {
    question: 'O que é um agente de IA?',
    answer:
      'Um agente de IA é um software que executa tarefas de forma autônoma — respondendo clientes, enviando follow-ups, automatizando processos internos ou gerenciando cobranças — sem precisar de um humano operando manualmente a cada ação.',
  },
  {
    question: 'Qual a diferença entre um chatbot e um agente de IA?',
    answer:
      'Um chatbot segue um roteiro fixo de respostas pré-definidas. Um agente de IA interpreta o contexto, decide a melhor ação e executa tarefas de ponta a ponta — como qualificar um lead, agendar um retorno ou disparar uma cobrança — adaptando-se ao que o cliente realmente precisa.',
  },
  {
    question: 'Quanto custa implementar um agente de IA?',
    answer:
      'Ferramentas prontas têm planos gratuitos ou a partir de R$50/mês. Agentes personalizados desenvolvidos sob medida partem de R$3.000. O diagnóstico ajuda a entender qual caminho faz sentido para o seu momento.',
  },
  {
    question: 'Quanto tempo leva para implementar?',
    answer:
      'Para ferramentas de prateleira, entre 1 e 2 semanas. Para agentes sob medida, de 15 a 30 dias dependendo da complexidade.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Focus Custom',
  url: 'https://focusinteligente.com.br',
  description:
    'Empresa brasileira que desenvolve agentes de inteligência artificial personalizados para o processo específico de cada negócio.',
  areaServed: { '@type': 'Country', name: 'Brasil' },
  knowsAbout: [
    'Agentes de IA',
    'Automação de atendimento',
    'Automação de vendas',
    'Automação de processos',
    'Automação financeira',
  ],
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Diagnóstico de Agente de IA',
  url: SITE,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  inLanguage: 'pt-BR',
  description:
    'Ferramenta gratuita de 6 perguntas que diagnostica qual tipo de agente de IA uma pequena ou média empresa deve implementar primeiro: atendimento, vendas, operação ou financeiro.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  provider: { '@type': 'Organization', name: 'Focus Custom', url: 'https://focusinteligente.com.br' },
}

export default function DiagnosticoPage() {
  return (
    <>
      <Helmet>
        <title>Qual Agente de IA Sua Empresa Precisa? Diagnóstico Gratuito em 2 Minutos</title>
        <meta
          name="description"
          content="Responda 6 perguntas e descubra qual tipo de agente de IA resolve o maior gargalo da sua empresa — atendimento, vendas, operação ou financeiro. Gratuito e sem cadastro."
        />
        <link rel="canonical" href={`${SITE}/`} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
      </Helmet>
      <DiagnosticoFlow />
    </>
  )
}
