import { useState } from 'react';

const CATEGORIAS = [
  {
    icone: '💬',
    titulo: 'Agente de Atendimento',
    texto: 'Automatiza respostas às dúvidas mais frequentes dos clientes via WhatsApp, Instagram ou chat no site — respondendo na hora e escalando para um humano só o que precisa.',
  },
  {
    icone: '📈',
    titulo: 'Agente de Vendas e Follow-up',
    texto: 'Mantém o contato com leads que já demonstraram interesse, reativa oportunidades frias e garante que nenhuma venda esfrie por falta de acompanhamento.',
  },
  {
    icone: '⚙️',
    titulo: 'Agente de Automação e Operação',
    texto: 'Conecta sistemas, move dados entre ferramentas e executa tarefas internas repetitivas — relatórios, notificações e processos que hoje consomem horas manuais.',
  },
  {
    icone: '💰',
    titulo: 'Agente Financeiro',
    texto: 'Automatiza cobranças, lembretes de pagamento e conciliação de recebíveis, dando previsibilidade de caixa sem perseguir cliente inadimplente na mão.',
  },
];

const FAQ = [
  {
    q: 'O que é um agente de IA?',
    a: 'Um agente de IA é um software que executa tarefas de forma autônoma — responder clientes, fazer follow-up, automatizar processos ou gerir cobranças — sem precisar de um humano operando a cada ação.',
  },
  {
    q: 'Qual a diferença entre um chatbot e um agente de IA?',
    a: 'Um chatbot segue um roteiro fixo. Um agente de IA interpreta o contexto, decide a melhor ação e executa a tarefa de ponta a ponta, adaptando-se ao que o cliente realmente precisa.',
  },
  {
    q: 'Quanto custa implementar um agente de IA?',
    a: 'Ferramentas prontas têm planos gratuitos ou a partir de R$50/mês. Agentes personalizados sob medida partem de cerca de R$3.000. O diagnóstico ajuda a entender qual caminho faz sentido agora.',
  },
  {
    q: 'Quanto tempo leva para implementar?',
    a: 'Ferramentas de prateleira: de 1 a 2 semanas. Agentes sob medida: de 15 a 30 dias, dependendo da complexidade.',
  },
];

export default function ConteudoSEO() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <section
      className="relative z-10 w-full border-t"
      style={{ borderColor: 'var(--surface-border)', background: 'var(--surface-soft)' }}
      aria-label="Sobre o diagnóstico de agente de IA"
    >
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-14">

        {/* Como funciona */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
            Como funciona o diagnóstico de agente de IA
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Muitas pequenas e médias empresas testam ferramentas de inteligência artificial sem
            resultado — não porque a tecnologia falha, mas porque estão resolvendo o problema errado.
            Este diagnóstico gratuito faz <strong style={{ color: 'var(--text-primary)' }}>6 perguntas rápidas</strong> sobre
            o seu negócio e indica qual dos quatro tipos de agente de IA você deveria implementar
            primeiro, com ferramentas recomendadas e um passo a passo para começar. Leva cerca de
            2 minutos e não exige cadastro.
          </p>
        </div>

        {/* Categorias */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6" style={{ color: 'var(--text-primary)' }}>
            Os 4 tipos de agente de IA para empresas
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {CATEGORIAS.map(cat => (
              <div
                key={cat.titulo}
                className="rounded-2xl p-5 border"
                style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}
              >
                <span className="text-2xl">{cat.icone}</span>
                <h3 className="text-lg font-bold mt-2 mb-1" style={{ color: 'var(--text-primary)' }}>{cat.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{cat.texto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ visível */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6" style={{ color: 'var(--text-primary)' }}>
            Perguntas frequentes
          </h2>
          <div className="flex flex-col gap-5">
            {FAQ.map(item => (
              <div key={item.q}>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sobre a Focus */}
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
          <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>Um produto da Focus Indica</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            A <strong style={{ color: 'var(--text-primary)' }}>Focus Indica</strong> é uma empresa brasileira que desenvolve
            agentes de inteligência artificial personalizados para o processo específico de cada negócio.
            Enquanto ferramentas de mercado resolvem parte do problema, a Focus cobre a integração, a
            configuração sob medida e a manutenção — o que costuma derrubar quem tenta sozinho.{' '}
            <a href="https://focusinteligente.com.br" target="_blank" rel="noopener noreferrer"
              className="underline" style={{ color: '#2563eb' }}>
              Conheça a Focus Indica
            </a>.
          </p>
        </div>

      </div>
    </section>
  );
}
