/**
 * Fundo compartilhado por todas as telas do flow.
 * Inclui gradiente principal + ondas pulsantes contínuas + grid sutil.
 * Renderiza como camada `position: absolute inset-0` — o conteúdo da tela
 * deve ficar acima (z-index > 0).
 */
export default function PageBackground({ variant = 'default' }: { variant?: 'default' | 'result' }) {
  const bg = variant === 'result' ? 'var(--page-bg-result)' : 'var(--page-bg)';
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, background: bg }}>
      {/* Ondas pulsantes contínuas */}
      <span
        className="bg-wave bg-wave-1"
        style={{
          top: '15%', left: '20%', width: 520, height: 520,
          background: 'radial-gradient(circle, var(--wave-color-1) 0%, transparent 65%)',
        }}
      />
      <span
        className="bg-wave bg-wave-2"
        style={{
          top: '55%', left: '75%', width: 480, height: 480,
          background: 'radial-gradient(circle, var(--wave-color-2) 0%, transparent 65%)',
        }}
      />
      <span
        className="bg-wave bg-wave-3"
        style={{
          top: '78%', left: '15%', width: 380, height: 380,
          background: 'radial-gradient(circle, var(--wave-color-3) 0%, transparent 65%)',
        }}
      />
      <span
        className="bg-wave bg-wave-1 bg-wave-drift"
        style={{
          top: '8%', left: '78%', width: 420, height: 420,
          background: 'radial-gradient(circle, var(--wave-color-3) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
