import { useEffect, useState } from 'react';

const MENSAGENS = [
  'Lendo suas respostas',
  'Cruzando com seu gargalo principal',
  'Identificando a categoria certa',
  'Pronto.',
];

const DURACAO_TOTAL = 3600; // ms
const INTERVALO = DURACAO_TOTAL / MENSAGENS.length;

interface Props {
  respostas: Record<number, string>;
  onConcluir: (respostas: Record<number, string>) => void;
}

export default function TelaAnalise({ respostas, onConcluir }: Props) {
  const [etapa, setEtapa] = useState(0);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const inicio = performance.now();

    const raf = requestAnimationFrame(function tick(agora) {
      const elapsed = agora - inicio;
      const pct = Math.min(elapsed / DURACAO_TOTAL, 1);
      setProgresso(pct);
      const etapaAtual = Math.min(Math.floor(pct * MENSAGENS.length), MENSAGENS.length - 1);
      setEtapa(etapaAtual);

      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => onConcluir(respostas), 300);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [respostas, onConcluir]);

  const circunferencia = 2 * Math.PI * 44;
  const offset = circunferencia * (1 - progresso);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8">

        {/* Anel SVG */}
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="#1B3A5C"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circunferencia}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-[#1B3A5C]">
              {Math.round(progresso * 100)}%
            </span>
          </div>
        </div>

        {/* Mensagem atual */}
        <div className="text-center min-h-[3rem]">
          {MENSAGENS.map((msg, i) => (
            <p
              key={msg}
              className={`text-base font-medium text-gray-700 transition-all duration-400 absolute
                ${i === etapa ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
              style={{ position: i === etapa ? 'relative' : 'absolute' }}
            >
              {msg}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}
