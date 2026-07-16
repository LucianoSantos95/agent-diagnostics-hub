import focusIcon from '@/assets/focus-indica-logo.svg';
import ThemeToggle from './ThemeToggle';

export default function Header({ onLogoClick }: { onLogoClick?: () => void }) {
  function handleLogoClick(e: React.MouseEvent) {
    if (onLogoClick) {
      e.preventDefault();
      onLogoClick();
    }
  }
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        background: 'var(--surface)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--surface-border)',
      }}
    >
      <a
        href="/"
        onClick={handleLogoClick}
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        aria-label="Voltar ao início"
      >
        <img
          src={focusIcon}
          alt="Focus Indica"
          style={{ height: 40, width: 'auto' }}
        />
        <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px', fontFamily: '"Sora", sans-serif' }}>
          Focus Indica
        </span>
      </a>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text-muted)',
            background: 'var(--surface-soft)',
            border: '1px solid var(--surface-border)',
            borderRadius: 999,
            padding: '4px 10px',
          }}
        >
          Diagnóstico gratuito
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
