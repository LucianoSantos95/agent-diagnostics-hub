import LandingLayout, { type FaqItem } from './LandingLayout';

const faq: FaqItem[] = [
  {
    pergunta: 'Como uma pequena empresa pode usar inteligência artificial?',
    resposta:
      'As quatro frentes que mais rendem em PME hoje são: (1) atendimento — chatbot ou agente de IA no WhatsApp respondendo dúvidas comuns; (2) vendas — IA fazendo follow-up de propostas e organizando o funil; (3) operação — automação de tarefas administrativas repetidas (planilhas, e-mails, agendamento); (4) financeiro — cobrança automática e conciliação bancária. Cada frente resolve um gargalo diferente.',
  },
  {
    pergunta: 'Quanto custa implantar IA numa pequena empresa?',
    resposta:
      'Depende do agente. Chatbot básico no WhatsApp começa em R$ 200/mês. Agente de IA generativa completo (com integração ao CRM e base própria) fica entre R$ 800 e R$ 3.000/mês. Ferramentas de IA para vendedor individual (tipo copiloto) partem de R$ 100/mês por usuário. Some 1–3 meses de implantação (R$ 5.000 a R$ 20.000 one-time) se for contratar parceiro.',
  },
  {
    pergunta: 'Vale a pena investir em IA se minha empresa é pequena?',
    resposta:
      'Vale quando o custo mensal do agente é menor do que o valor do tempo humano que ele libera. Exemplo: se seu atendente ganha R$ 3.000/mês e passa 50% do tempo respondendo perguntas repetidas, um chatbot de R$ 500/mês que absorve essas perguntas paga sozinho — e sobra atendente pra vender. O erro comum é tentar implantar IA numa área que não é gargalo.',
  },
  {
    pergunta: 'Por onde começar? Todos falam em IA e eu não sei o que fazer.',
    resposta:
      'Não escolha a ferramenta primeiro. Escolha o gargalo primeiro. Se você perde cliente porque demora pra responder no WhatsApp, o gargalo é atendimento. Se você tem lead mas não fecha, é vendas. Se seu time gasta o dia em planilha, é operação. Cada gargalo tem um agente de IA diferente. Nosso diagnóstico gratuito de 2 minutos identifica qual é o seu.',
  },
  {
    pergunta: 'Preciso de equipe técnica para usar IA na minha empresa?',
    resposta:
      'Para as ferramentas de prateleira (ChatGPT Business, chatbots no-code, IA de CRM), não. Para agentes de IA customizados que conversam com seus dados, sim — mas dá pra contratar implantação como projeto único, sem manter time interno. A regra: se sua PME tem menos de 50 pessoas, comece pelas ferramentas prontas antes de pensar em customização.',
  },
];

export default function IaPequenasEmpresas() {
  return (
    <LandingLayout
      slug="/ia-para-pequenas-empresas"
      title="IA para pequenas empresas: por onde começar em 2026 (sem gastar errado)"
      metaDescription="IA para pequenas empresas: como escolher entre chatbot, agente de vendas, automação operacional e IA financeira. Custos reais no Brasil e passo a passo para PMEs."
      h1={<>IA para pequenas empresas: <span style={{ color: '#4f46e5' }}>por onde começar</span> sem gastar errado</>}
      intro={
        <>
          A maioria das PMEs que tenta usar IA começa pela ferramenta errada,
          gasta 3 a 6 meses testando, e desiste. O problema quase nunca é a IA —
          é ter atacado o gargalo errado. Este guia mostra as quatro frentes que
          fazem sentido em pequena empresa, quando cada uma paga, e como escolher
          a primeira.
        </>
      }
      blocos={[
        {
          titulo: 'As quatro frentes de IA que rendem em PME',
          conteudo: (
            <>
              <p className="mb-3">
                Fora modismo e demo bonita, o que realmente entrega retorno em
                pequena empresa hoje se resume a quatro tipos de agente:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Agente de atendimento</strong> — chatbot ou IA
                  generativa no WhatsApp/site respondendo perguntas comuns 24h.
                  Paga quando o volume repetido é alto.
                </li>
                <li>
                  <strong>Agente de vendas</strong> — IA que faz follow-up de
                  proposta, qualifica lead, organiza pipeline. Paga quando você
                  tem muito lead perdido por falta de retomada.
                </li>
                <li>
                  <strong>Agente operacional</strong> — automação de tarefas
                  repetidas (relatórios, agendamento, entrada de dados). Paga
                  quando o time gasta mais tempo em planilha do que em cliente.
                </li>
                <li>
                  <strong>Agente financeiro</strong> — cobrança automática,
                  conciliação bancária, alerta de inadimplência. Paga em
                  negócios com muito recorrente ou muita nota curta.
                </li>
              </ul>
            </>
          ),
        },
        {
          titulo: 'O erro que quebra a implantação',
          conteudo: (
            <p>
              O erro mais comum é: dono da PME lê sobre IA num LinkedIn, contrata
              chatbot, e três meses depois cancela porque "não funcionou". Quase
              sempre o chatbot funcionou tecnicamente — mas o gargalo real da
              empresa era vendas ou operação, não atendimento. IA numa área que
              não é gargalo <em>não gera dinheiro visível</em>. Antes de escolher
              ferramenta, escolha qual gargalo você quer atacar.
            </p>
          ),
        },
        {
          titulo: 'Quanto uma PME paga por IA em 2026 (faixas realistas)',
          conteudo: (
            <>
              <p className="mb-3">
                Faixas para PMEs de 5 a 50 funcionários no Brasil:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Chatbot no WhatsApp: R$ 200–1.500/mês</li>
                <li>Agente de vendas (copiloto para vendedor): R$ 100–400/mês por usuário</li>
                <li>Automação operacional (n8n, Make + IA): R$ 200–800/mês</li>
                <li>Agente financeiro/cobrança: R$ 300–1.000/mês</li>
              </ul>
              <p className="mt-3">
                Regra do bolso: se o custo mensal do agente for menor que 10% do
                valor de tempo humano que ele libera, o investimento faz
                sentido. Se for maior, quase sempre está sendo aplicado no
                lugar errado.
              </p>
            </>
          ),
        },
        {
          titulo: 'Como saber qual agente de IA sua empresa precisa primeiro',
          conteudo: (
            <p>
              Não existe resposta genérica — depende de onde vaza dinheiro na sua
              operação hoje. Nosso diagnóstico gratuito faz 6 perguntas rápidas
              (tempo de resposta, taxa de fechamento, tempo gasto em tarefas
              administrativas, cobrança) e devolve qual dos quatro agentes é o
              certo para começar na sua empresa — e por quê. Sem cadastro, sem
              contato comercial forçado.
            </p>
          ),
        },
      ]}
      faq={faq}
    />
  );
}
