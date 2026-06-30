import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const t = setTimeout(() => setVisivel(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0a1628 0%, #1B3A5C 55%, #0f2440 100%)', paddingTop: '60px' }}
    >
      {/* Animated blobs */}
      <div
        className="animate-blob absolute pointer-events-none"
        style={{
          top: '-150px', right: '-100px',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="animate-blob2 delay-2000 absolute pointer-events-none"
        style={{
          bottom: '-180px', left: '-80px',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)',
        }}
      />
      <div
        className="animate-blob3 delay-4000 absolute pointer-events-none"
        style={{
          top: '40%', left: '50%',
          width: 350, height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content — two column on desktop */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* LEFT: text + CTA */}
            <div className="flex-1 flex flex-col gap-7 text-center lg:text-left">

              {/* Badge */}
              <div
                className={`transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '0ms' }}
              >
                <span
                  className="inline-flex items-center gap-2 border text-xs font-semibold px-4 py-2 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: '#93c5fd' }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Diagnóstico gratuito · 2 minutos
                </span>
              </div>

              {/* H1 */}
              <div
                className={`transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '120ms' }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white">
                  Qual agente de IA
                  <br />
                  sua empresa
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #60a5fa 0%, #a5b4fc 50%, #818cf8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    precisa primeiro?
                  </span>
                </h1>
              </div>

              {/* Subtítulo */}
              <div
                className={`transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '220ms' }}
              >
                <p className="text-lg leading-relaxed max-w-lg" style={{ color: '#93c5fd' }}>
                  7 perguntas. Diagnóstico preciso. Você descobre qual agente resolve
                  o maior gargalo do seu negócio — sem testar ferramentas às cegas.
                </p>
              </div>

              {/* CTA */}
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
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)' }}
                  />
                </button>
                <p className="text-xs self-center" style={{ color: 'rgba(147,197,253,0.5)' }}>
                  Sem cadastro · Resultado imediato · 100% gratuito
                </p>
              </div>

              {/* Stats */}
              <div
                className={`flex gap-8 justify-center lg:justify-start transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '420ms' }}
              >
                {[
                  { num: '7', label: 'perguntas' },
                  { num: '4', label: 'categorias' },
                  { num: '2min', label: 'duração' },
                ].map(s => (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-extrabold text-white">{s.num}</span>
                    <span className="text-xs" style={{ color: 'rgba(147,197,253,0.6)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: category preview cards */}
            <div
              className={`flex-shrink-0 w-full lg:w-[380px] transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
              style={{ transitionDelay: '300ms' }}
            >
              {/* Main preview card */}
              <div
                className="rounded-2xl p-6 border relative"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(147,197,253,0.5)' }}>
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
                      <p className="text-sm font-bold text-white mt-2">{cat.nome}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.8)' }}>{cat.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Social proof */}
                <div
                  className="mt-5 pt-4 border-t"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['#f59e0b', '#10b981', '#3b82f6'].map((c, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: c, borderColor: 'rgba(15,32,64,0.9)' }}
                        >
                          {['A', 'B', 'C'][i]}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs leading-tight" style={{ color: 'rgba(147,197,253,0.65)' }}>
                      <strong className="text-white">Case real:</strong> "Testamos 6 ferramentas.
                      Nenhuma funcionou — porque estávamos resolvendo o problema errado."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
