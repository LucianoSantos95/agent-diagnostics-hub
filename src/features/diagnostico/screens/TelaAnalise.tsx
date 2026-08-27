import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import PageBackground from '@/components/PageBackground';

// Passos reais do que acontece aqui: classificar a frente + montar o playbook.
const PASSOS = [
  'Analisando suas respostas',
  'Definindo a frente prioritária',
  'Montando seu playbook',
];

// Curto e honesto. Timer-based (não requestAnimationFrame) pra não travar
// se a aba perder o foco — o onConcluir SEMPRE dispara no prazo.
const DURACAO_MS = 1100;

interface Props {
  respostas: Record<number, string>;
  onConcluir: (respostas: Record<number, string>) => void;
}

export default function TelaAnalise({ respostas, onConcluir }: Props) {
  const prefersReduced = useReducedMotion();
  const [etapa, setEtapa] = useState(0);
  const [preencheu, setPreencheu] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    const total = prefersReduced ? 250 : DURACAO_MS;
    const passoMs = total / PASSOS.length;

    // dispara a transição do anel no próximo frame lógico
    const t0 = window.setTimeout(() => setPreencheu(true), 30);
    const passos = PASSOS.map((_, i) =>
      window.setTimeout(() => setEtapa(i), Math.round(passoMs * i)),
    );
    const fim = window.setTimeout(() => {
      doneRef.current = true;
      onConcluir(respostas);
    }, total);

    return () => {
      clearTimeout(t0);
      passos.forEach(clearTimeout);
      clearTimeout(fim);
    };
  }, [respostas, onConcluir, prefersReduced]);

  const circ = 2 * Math.PI * 44;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ paddingTop: '60px' }}
      role="status"
      aria-live="polite"
    >
      <PageBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-sm w-full">
        <div className="relative w-40 h-40">
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-70"
            style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.45) 0%, transparent 65%)' }}
          />
          <svg viewBox="0 0 100 100" className="relative w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border-soft)" strokeWidth="2.5" />
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={preencheu ? 0 : circ}
              style={{
                transition: `stroke-dashoffset ${prefersReduced ? 0 : DURACAO_MS}ms linear`,
                filter: 'drop-shadow(0 0 6px var(--accent-glow))',
              }}
            />
            <defs>
              <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--text-accent)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="text-center h-8 flex items-center justify-center overflow-hidden">
          <p key={etapa} className="text-base font-medium animate-fade-up" style={{ color: 'var(--text-secondary)' }}>
            {PASSOS[etapa]}…
          </p>
        </div>

        <div className="flex gap-2">
          {PASSOS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === etapa ? 20 : 6,
                height: 6,
                background: i <= etapa ? 'linear-gradient(90deg, var(--accent), var(--text-accent))' : 'var(--border-soft)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
