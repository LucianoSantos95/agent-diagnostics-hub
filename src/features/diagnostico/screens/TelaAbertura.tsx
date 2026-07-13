import { useEffect, useState } from 'react';
import PageBackground from '@/components/PageBackground';
import CaseRealDialog from '@/components/CaseRealDialog';
import FeedbackDialog from '@/components/FeedbackDialog';
import { MessageSquarePlus } from 'lucide-react';
import ConteudoSEO from './ConteudoSEO';

interface Props {
  onIniciar: () => void;
}

const CATEGORIAS = [
  { icone: '💬', nome: 'Atendimento', cor: '#0ea5e9', desc: 'Resposta automática 24h' },
  { icone: '📈', nome: 'Vendas', cor: '#10b981', desc: 'Follow-up sem esquecer' },
  { icone: '⚙️', nome: 'Operação', cor: '#8b5cf6', desc: 'Processos sem retrabalho' },
  { icone: '💰', nome: 'Financeiro', cor: '#f59e0b', desc: 'Cobrança automática' },
];

export default function TelaAbertura({ onIniciar }: Props) {
  const [visivel, setVisivel] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [fbOpen, setFbOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisivel(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ paddingTop: '60px' }}
    >
      <PageBackground />

      {/* Main content — two column on desktop */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* LEFT: text + CTA */}
            <div className="flex-1 flex flex-col gap-7 text-center lg:text-left">

              <div
                className={`transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '0ms' }}
              >
                <span
                  className="inline-flex items-center gap-2 border text-xs font-semibold px-4 py-2 rounded-full"
                  style={{ background: 'var(--surface-soft)', borderColor: 'var(--surface-border)', color: 'var(--text-secondary)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Diagnóstico gratuito · 2 minutos
                </span>
              </div>

              <div
                className={`transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '120ms' }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Qual agente de IA
                  <br />
                  sua empresa
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 50%, #4f46e5 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    precisa primeiro?
                  </span>
                </h1>
              </div>

              <div
                className={`transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '220ms' }}
              >
                <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>
                  Chatbot no WhatsApp, automação de atendimento ou IA para vendas?
                  6 perguntas revelam qual agente de IA resolve o maior gargalo da sua
                  pequena empresa — sem testar ferramentas às cegas.
                </p>
              </div>

              <div
                className={`flex flex-col lg:flex-row items-center lg:items-start gap-3 transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '340ms' }}
              >
                <button
                  onClick={onIniciar}
                  className="group relative px-10 py-4 rounded-2xl font-bold text-base text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    boxShadow: '0 0 50px rgba(37,99,235,0.45), 0 8px 32px rgba(0,0,0,0.3)',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Começar diagnóstico
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </button>
                <p className="text-xs self-center" style={{ color: 'var(--text-muted)' }}>
                  Sem cadastro · Resultado imediato · 100% gratuito
                </p>
              </div>

              <div
                className={`flex gap-8 justify-center lg:justify-start transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '420ms' }}
              >
                {[
                  { num: '6', label: 'perguntas' },
                  { num: '4', label: 'categorias' },
                  { num: '2min', label: 'duração' },
                ].map(s => (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{s.num}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: category preview cards */}
            <div
              className={`flex-shrink-0 w-full lg:w-[380px] transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div
                className="rounded-2xl p-6 border relative"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--surface-border)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                  O que você vai descobrir
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIAS.map((cat, i) => (
                    <div
                      key={cat.nome}
                      className={`rounded-xl p-4 border transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{
                        background: `${cat.cor}18`,
                        borderColor: `${cat.cor}35`,
                        transitionDelay: `${400 + i * 80}ms`,
                      }}
                    >
                      <span className="text-2xl">{cat.icone}</span>
                      <p className="text-sm font-bold mt-2" style={{ color: 'var(--text-primary)' }}>{cat.nome}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{cat.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--surface-border)' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['#f59e0b', '#10b981', '#3b82f6'].map((c, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: c, borderColor: 'var(--surface)' }}
                        >
                          {['A', 'B', 'C'][i]}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setCaseOpen(true)}
                      className="text-xs leading-tight text-left hover:opacity-80 transition-opacity cursor-pointer"
                      style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', padding: 0 }}
                    >
                      <strong style={{ color: 'var(--text-primary)' }} className="underline decoration-dotted underline-offset-2">Case real:</strong> "Testamos 6 ferramentas.
                      Nenhuma funcionou — porque estávamos resolvendo o problema errado."
                    </button>
                  </div>

                  <button
                    onClick={() => setFbOpen(true)}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl text-xs font-semibold py-2.5 border transition-all hover:scale-[1.02]"
                    style={{
                      background: 'var(--surface-soft)',
                      borderColor: 'var(--surface-border)',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    <MessageSquarePlus size={14} />
                    Deixar feedback
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Conteúdo textual para SEO + GEO */}
      <ConteudoSEO />

      <CaseRealDialog open={caseOpen} onClose={() => setCaseOpen(false)} />
      <FeedbackDialog open={fbOpen} onClose={() => setFbOpen(false)} />
    </div>
  );
}
