import { useEffect, useState } from 'react';

const MENSAGENS = [
  'Lendo suas respostas...',
  'Cruzando com seu gargalo principal...',
  'Identificando a categoria certa...',
  'Quase lá...',
];

const DURACAO_TOTAL = 3600;

interface Props {
  respostas: Record<number, string>;
  onConcluir: (respostas: Record<number, string>) => void;
}

export default function TelaAnalise({ respostas, onConcluir }: Props) {
  const [etapa, setEtapa] = useState(0);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const inicio = performance.now();
    let rafId: number;

    const tick = (agora: number) => {
      const elapsed = agora - inicio;
      const pct = Math.min(elapsed / DURACAO_TOTAL, 1);
      setProgresso(pct);
      setEtapa(Math.min(Math.floor(pct * MENSAGENS.length), MENSAGENS.length - 1));

      if (pct < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onConcluir(respostas), 300);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [respostas, onConcluir]);

  const circunferencia = 2 * Math.PI * 44;
  const offset = circunferencia * (1 - progresso);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0a1628 0%, #1B3A5C 55%, #0f2440 100%)', paddingTop: '60px' }}
    >
      {/* Animated blobs */}
      <div
        className="animate-blob absolute pointer-events-none"
        style={{
          top: '-100px', right: '-80px', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="animate-blob2 delay-2000 absolute pointer-events-none"
        style={{
          bottom: '-120px', left: '-60px', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-sm w-full">

        {/* Ring */}
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circunferencia}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.08s linear' }}
            />
            <defs>
              <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {Math.round(progresso * 100)}%
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="text-center h-12 flex items-center justify-center overflow-hidden">
          {MENSAGENS.map((msg, i) => (
            <p
              key={msg}
              className="text-base font-medium transition-all duration-400"
              style={{
                color: '#93c5fd',
                position: i === etapa ? 'relative' : 'absolute',
                opacity: i === etapa ? 1 : 0,
                transform: i === etapa ? 'translateY(0)' : 'translateY(8px)',
                pointerEvents: i === etapa ? 'auto' : 'none',
              }}
            >
              {msg}
            </p>
          ))}
        </div>

        {/* Steps */}
        <div className="flex gap-2">
          {MENSAGENS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === etapa ? 20 : 6,
                height: 6,
                background: i <= etapa
                  ? 'linear-gradient(90deg, #3b82f6, #818cf8)'
                  : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
