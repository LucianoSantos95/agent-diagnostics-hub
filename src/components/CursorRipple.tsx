import { useEffect, useRef } from 'react';

/**
 * Emite uma ondulação no ponto do cursor (mousemove) com throttle.
 * Renderiza um overlay absoluto pointer-events-none.
 */
export default function CursorRipple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastEmit = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastEmit.current < 80) return;
      lastEmit.current = now;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const dot = document.createElement('span');
      dot.className = 'cursor-ripple-dot';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      el.appendChild(dot);
      setTimeout(() => dot.remove(), 950);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
