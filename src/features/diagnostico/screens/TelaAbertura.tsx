import { useEffect, useState } from 'react';
import CaseRealDialog from '@/components/CaseRealDialog';
import FeedbackDialog from '@/components/FeedbackDialog';
import { MessageSquarePlus, ArrowRight, Check, MessageCircle, TrendingUp, Settings, DollarSign } from 'lucide-react';
import ConteudoSEO from './ConteudoSEO';

interface Props {
  onIniciar: () => void;
}

const CATEGORIAS = [
  { Icon: MessageCircle, nome: 'Atendimento', pct: '98%', label: 'resposta 24h' },
  { Icon: TrendingUp,    nome: 'Vendas',      pct: '3x',  label: 'follow-up' },
  { Icon: Settings,      nome: 'Operação',    pct: '−40%',label: 'retrabalho' },
  { Icon: DollarSign,    nome: 'Financeiro',  pct: 'auto',label: 'cobrança' },
];

export default function TelaAbertura({ onIniciar }: Props) {
  const [visivel, setVisivel] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [fbOpen, setFbOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisivel(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col relative" style={{ background: 'var(--bg-base)', paddingTop: 60 }}>
      <div className="flex-1 w-full flex flex-col lg:flex-row">
        {/* ================= LEFT: strategic content ================= */}
        <div
          className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-20 py-12 lg:py-16 flex flex-col justify-center relative z-10"
          style={{ borderRight: '1px solid var(--surface-border)' }}
        >
          <div className="max-w-lg mx-auto lg:mx-0 w-full">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 transition-all duration-700 ease-out ${
                visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                background: 'var(--accent-soft)',
                border: '1px solid var(--accent-border)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent)' }} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Inteligência Estratégica
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6 transition-all duration-700 ease-out ${
                visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ color: 'var(--text-primary)', transitionDelay: '80ms' }}
            >
              Descubra qual{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #4f46e5 0%, #a5b4fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Agente de IA
              </span>{' '}
              sua empresa exige.
            </h1>

            {/* Sub */}
            <p
              className={`text-lg leading-relaxed mb-10 transition-all duration-700 ease-out ${
                visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ color: 'var(--text-secondary)', transitionDelay: '160ms' }}
            >
              Um diagnóstico técnico de 2 minutos para mapear gargalos e recomendar a
              automação ideal para Atendimento, Vendas, Operação ou Financeiro.
            </p>

            {/* Feature bullets */}
            <div
              className={`space-y-5 mb-10 transition-all duration-700 ease-out ${
                visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '240ms' }}
            >
              {[
                { t: 'Relatório consultivo', d: 'Recomendação baseada no gargalo real da sua operação.' },
                { t: 'Diagnóstico gratuito', d: 'Sem cadastro. 6 perguntas. Resultado imediato.' },
              ].map((f) => (
                <div key={f.t} className="flex items-start gap-3">
                  <div
                    className="mt-1 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full"
                    style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)' }}
                  >
                    <Check size={12} strokeWidth={3} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {f.t}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {f.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`transition-all duration-700 ease-out ${
                visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '320ms' }}
            >
              <button
                onClick={onIniciar}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-xl overflow-hidden font-display font-bold text-white transition-all duration-300"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 30px var(--accent-glow)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    '0 0 50px var(--accent-glow), 0 0 80px rgba(79,70,229,0.25)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px var(--accent-glow)';
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Iniciar diagnóstico agora
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <p
                className="mt-5 text-[10px] uppercase tracking-[0.2em] font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                Tempo estimado: 02 min · Sem cadastro · LGPD
              </p>
            </div>

            {/* Case real link */}
            <div
              className={`mt-10 pt-6 transition-all duration-700 ease-out ${
                visivel ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ borderTop: '1px solid var(--surface-border)', transitionDelay: '440ms' }}
            >
              <div className="flex items-start gap-3">
                <div className="flex -space-x-2 flex-shrink-0">
                  {['#f59e0b', '#10b981', '#4f46e5'].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: c, borderColor: 'var(--bg-base)' }}
                    >
                      {['A', 'B', 'C'][i]}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCaseOpen(true)}
                  className="text-xs text-left hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <strong style={{ color: 'var(--text-primary)' }} className="underline decoration-dotted underline-offset-2">
                    Case real:
                  </strong>{' '}
                  "Testamos 6 ferramentas. Nenhuma funcionou — porque estávamos resolvendo o problema errado."
                </button>
              </div>

              <button
                onClick={() => setFbOpen(true)}
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg transition-all hover:opacity-80"
                style={{
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--surface-border)',
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

        {/* ================= RIGHT: architectural tech visual ================= */}
        <div
          className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg-elev)' }}
        >
          {/* Ambient glows */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 500,
              height: 500,
              background: 'var(--accent)',
              opacity: 0.18,
              filter: 'blur(120px)',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 300,
              height: 300,
              background: 'var(--bg-elev-2)',
              opacity: 0.5,
              filter: 'blur(80px)',
            }}
          />

          {/* Core */}
          <div className="relative w-96 h-96">
            {/* Outer orbit */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '1px solid var(--accent-border)',
                animation: 'spin 24s linear infinite',
              }}
            >
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                style={{ background: 'var(--accent)', boxShadow: '0 0 15px var(--accent)' }}
              />
            </div>
            {/* Inner orbit */}
            <div
              className="absolute inset-12 rounded-full"
              style={{
                border: '1px solid rgba(79,70,229,0.15)',
                animation: 'spin 18s linear infinite reverse',
              }}
            >
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{ background: '#a5b4fc', boxShadow: '0 0 10px #a5b4fc' }}
              />
            </div>

            {/* Central diamond */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-3xl flex items-center justify-center backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, var(--bg-elev-2) 0%, var(--bg-base) 100%)',
                border: '1px solid var(--accent-border)',
                transform: 'translate(-50%,-50%) rotate(45deg)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'var(--accent-soft)', transform: 'rotate(-45deg)' }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                  <rect x="3" y="3" width="18" height="14" rx="2" />
                  <path d="M3 13h18M8 21h8M12 17v4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Floating indicators */}
            {CATEGORIAS.map((cat, i) => {
              const positions = [
                { top: '15%', right: '-20%' },
                { bottom: '15%', left: '-25%' },
                { top: '25%', left: '-30%' },
                { bottom: '25%', right: '-15%' },
              ];
              return (
                <div
                  key={cat.nome}
                  className="absolute px-3 py-2 rounded-lg backdrop-blur-md animate-float-y"
                  style={{
                    ...positions[i],
                    background: 'rgba(10,10,26,0.75)',
                    border: '1px solid var(--accent-border)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                    animationDelay: `${i * 0.6}s`,
                    animationDuration: `${4 + i * 0.4}s`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <cat.Icon size={12} style={{ color: 'var(--accent)' }} />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                        {cat.nome}
                      </span>
                      <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
                        {cat.pct} · {cat.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </div>

      {/* SEO content below */}
      <ConteudoSEO />

      <CaseRealDialog open={caseOpen} onClose={() => setCaseOpen(false)} />
      <FeedbackDialog open={fbOpen} onClose={() => setFbOpen(false)} />
    </div>
  );
}
