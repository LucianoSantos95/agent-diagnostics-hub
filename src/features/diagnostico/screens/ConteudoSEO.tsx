import { useState } from 'react';
import { Link } from 'react-router-dom';


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
            Muita gente — de autônomo a empresa com time — testa ferramentas de inteligência
            artificial sem resultado, não porque a tecnologia falha, mas porque está resolvendo o
            problema errado. Este diagnóstico gratuito faz <strong style={{ color: 'var(--text-primary)' }}>7 perguntas rápidas</strong> sobre
            o seu trabalho e indica qual das quatro frentes de IA você deveria montar primeiro, com
            ferramentas recomendadas e um <strong style={{ color: 'var(--text-primary)' }}>playbook com o passo a passo</strong> —
            incluindo como integrar ferramentas via API ou MCP. Leva cerca de 2 minutos e não exige cadastro.
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
          <div className="flex flex-col gap-3">
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border overflow-hidden"
                  style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between text-left px-5 py-4 gap-4 transition-colors hover:bg-white/5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span className="text-base font-bold">{item.q}</span>
                    <span
                      aria-hidden
                      className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-lg font-bold transition-transform"
                      style={{
                        background: 'var(--surface-soft)',
                        color: 'var(--text-secondary)',
                        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: open ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.25s ease',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <p
                        className="text-sm leading-relaxed px-5 pb-4"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guias relacionados */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6" style={{ color: 'var(--text-primary)' }}>
            Guias práticos para PMEs
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { to: '/chatbot-para-empresas', titulo: 'Chatbot para empresas', desc: 'Quando vale a pena e quanto custa no Brasil.' },
              { to: '/automacao-de-atendimento', titulo: 'Automação de atendimento', desc: 'Por onde começar sem gastar errado.' },
              { to: '/ia-para-pequenas-empresas', titulo: 'IA para pequenas empresas', desc: 'As 4 frentes que rendem em PME.' },
            ].map((g) => (
              <Link
                key={g.to}
                to={g.to}
                className="rounded-2xl p-5 border transition-all hover:scale-[1.02]"
                style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)', textDecoration: 'none' }}
              >
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{g.titulo} →</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Sobre a Focus */}
        <div className="rounded-2xl p-6 border" style={{ background: 'var(--surface)', borderColor: 'var(--surface-border)' }}>
          <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>Sobre a Focus Inteligente</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            A <strong style={{ color: 'var(--text-primary)' }}>Focus Inteligente</strong> desenha operações que trazem
            clareza, precisão e eficiência ao modo como sua empresa funciona — do mapeamento de processos aos agentes de IA
            sob medida. Como Lovable Partner oficial, combina auditoria de fluxos, arquitetura de automação e agentes
            customizados para eliminar trabalho manual em PMEs e agências. Mais de 50 empresas já operam com Focus.{' '}
            <a href="https://focusinteligente.com.br" target="_blank" rel="noopener noreferrer"
              className="underline" style={{ color: '#4f46e5' }}>
              Conheça a Focus Inteligente
            </a>.
          </p>
        </div>

      </div>
    </section>
  );
}
