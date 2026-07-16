import FocusIndicaLogo from '@/components/FocusIndicaLogo';
import ThemeToggle from './ThemeToggle';
import { useScrollY } from '@/hooks/useScrollY';

export default function Header({ onLogoClick }: { onLogoClick?: () => void }) {
  const { past } = useScrollY(80);

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
        height: past ? '48px' : '60px',
        display: 'flex',
        alignItems: 'center',
        padding: past ? '0 20px' : '0 24px',
        background: 'var(--surface)',
        backdropFilter: past ? 'blur(24px) saturate(1.4)' : 'blur(16px)',
        borderBottom: `1px solid ${past ? 'var(--surface-border)' : 'var(--surface-border)'}`,
        transition: 'height 300ms cubic-bezier(0.4,0,0.2,1), padding 300ms cubic-bezier(0.4,0,0.2,1), backdrop-filter 300ms ease',
      }}
    >
      <a
        href="/"
        onClick={handleLogoClick}
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: past ? 6 : 10,
          cursor: 'pointer',
          color: 'var(--text-primary)',
          transition: 'gap 300ms cubic-bezier(0.4,0,0.2,1)',
        }}
        aria-label="Voltar ao início"
      >
        <FocusIndicaLogo
          size={past ? 30 : 40}
          className="transition-all duration-300"
        />

        <span
          style={{
            fontSize: past ? 15 : 17,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: past ? '-1.2px' : '-0.3px',
            fontFamily: '"Sora", sans-serif',
            transition: 'font-size 300ms cubic-bezier(0.4,0,0.2,1), letter-spacing 400ms cubic-bezier(0.34,1.56,0.64,1)',
            whiteSpace: 'nowrap',
          }}
        >
          Focus Indica
        </span>
      </a>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          aria-hidden={past}
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text-muted)',
            background: 'var(--surface-soft)',
            border: '1px solid var(--surface-border)',
            borderRadius: 999,
            padding: past ? '4px 0' : '4px 10px',
            opacity: past ? 0 : 1,
            transform: past ? 'translateX(12px) scale(0.9)' : 'translateX(0) scale(1)',
            pointerEvents: past ? 'none' : 'auto',
            maxWidth: past ? 0 : 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            transition: 'opacity 250ms ease, transform 300ms cubic-bezier(0.4,0,0.2,1), max-width 300ms cubic-bezier(0.4,0,0.2,1), padding 300ms ease',
          }}
        >
          Diagnóstico gratuito
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
