import { Helmet } from 'react-helmet-async'
import DiagnosticoFlow from '@/features/diagnostico/DiagnosticoFlow'

const FAQ_ITEMS = [
  {
    question: 'O que é um agente de IA?',
    answer:
      'Um agente de IA é um software que executa tarefas de forma autônoma — respondendo clientes, enviando follow-ups, automatizando processos internos ou gerenciando cobranças — sem precisar de um humano operando manualmente a cada ação.',
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

export default function DiagnosticoPage() {
  return (
    <>
      <Helmet>
        <title>Qual Agente de IA Sua Empresa Precisa? Diagnóstico Gratuito em 2 Minutos</title>
        <meta
          name="description"
          content="Responda 7 perguntas e descubra qual tipo de agente de IA resolve o maior gargalo da sua empresa — atendimento, vendas, operação ou financeiro. Gratuito e sem compromisso."
        />
        <link rel="canonical" href="https://diagnostico.focusinteligente.com.br" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <DiagnosticoFlow />
    </>
  )
}
