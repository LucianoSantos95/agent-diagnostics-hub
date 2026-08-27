// Primitivas de movimento — mesma linguagem dos outros projetos Focus
// (gestaofocus-prime / Hub Central): contenção, crossfade curto, spring
// snappy, e sempre respeitando prefers-reduced-motion.
import type { Transition, Variants } from 'framer-motion';

/** easeOutQuint — a curva padrão da casa. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Spring rápido pra elementos pequenos (chips, botões, ícones). */
export const SPRING_SNAPPY: Transition = { type: 'spring', stiffness: 500, damping: 35 };

export const DUR = {
  fast: 0.18,
  base: 0.26,
  slow: 0.36,
} as const;

/** Crossfade puro pra troca de tela/pergunta — sem deslocar a página inteira. */
export const fadeSwap: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/** Entrada sutil de seção (opacity + 12px), usada com whileInView once. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

/** Micro-interação de botão — hover leve + tap com recuo. */
export const pressable = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
} as const;
