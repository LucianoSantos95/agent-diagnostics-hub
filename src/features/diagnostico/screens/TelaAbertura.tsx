import { useEffect, useState } from 'react';

interface Props {
  onIniciar: () => void;
}

export default function TelaAbertura({ onIniciar }: Props) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisivel(true), 80);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay: number) =>
    `transition-all duration-700 ease-out ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0a1628 0%, #1B3A5C 55%, #0f2440 100%)' }}
    >
      {/* Orbs */}
      <div className="absolute top-[-120px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)' }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px'
        }} />

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center gap-8">

        {/* Badge */}
        <div className={anim(0)} style={{ transitionDelay: '0ms' }}>
          <span className="inline-flex items-center gap-2 border text-xs font-semibold px-4 py-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: '#93c5fd' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Diagnóstico gratuito · 2 minutos
          </span>
        </div>

        {/* H1 */}
        <div className={anim(120)} style={{ transitionDelay: '120ms' }}>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white">
            Qual agente de IA sua empresa
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #60a5fa 0%, #a5b4fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              precisa primeiro?
            </span>
          </h1>
        </div>

        {/* Subtítulo */}
        <div className={anim(220)} style={{ transitionDelay: '220ms' }}>
          <p className="text-lg leading-relaxed max-w-md" style={{ color: '#93c5fd' }}>
            Responda 7 perguntas e descubra qual tipo de agente resolve
            o maior gargalo do seu negócio — sem testar ferramentas às cegas.
          </p>
        </div>

        {/* CTA */}
        <div className={`flex flex-col items-center gap-3 ${anim(340)}`} style={{ transitionDelay: '340ms' }}>
          <button
            onClick={onIniciar}
            className="group relative px-10 py-4 rounded-2xl font-bold text-base text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              boxShadow: '0 0 40px rgba(37,99,235,0.4), 0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Começar diagnóstico
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)' }} />
          </button>
          <p className="text-xs" style={{ color: 'rgba(147,197,253,0.5)' }}>
            Sem cadastro · Resultado imediato · 100% gratuito
          </p>
        </div>

        {/* Stats */}
        <div className={`flex gap-10 ${anim(420)}`} style={{ transitionDelay: '420ms' }}>
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

        {/* Prova social */}
        <div className={anim(500)} style={{ transitionDelay: '500ms' }}>
          <div className="rounded-2xl px-6 py-5 text-left max-w-md border"
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex -space-x-2">
                {['#f59e0b', '#10b981', '#3b82f6'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: c, borderColor: '#1B3A5C' }}>
                    {['A', 'B', 'C'][i]}
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: 'rgba(147,197,253,0.7)' }}>CASE REAL</span>
            </div>
            <p className="text-sm leading-relaxed italic" style={{ color: '#bfdbfe' }}>
              "Testamos 6 ferramentas de IA em um ano. Nenhuma funcionou —
              porque estávamos resolvendo o problema errado com a ferramenta certa."
            </p>
            <p className="text-xs mt-3" style={{ color: 'rgba(147,197,253,0.4)' }}>
              — PME do setor de serviços, SP
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
