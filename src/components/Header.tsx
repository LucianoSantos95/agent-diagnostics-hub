import focusLogo from '@/assets/focus-logo.png.asset.json';
import ThemeToggle from './ThemeToggle';

export default function Header() {
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
        href="https://focusinteligente.com.br"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <img
          src={focusLogo.url}
          alt="Focus"
          style={{ height: 28, width: 'auto', filter: 'var(--logo-filter)' }}
        />
        <span style={{ fontSize: 16, fontWeight: 700, color: '#60a5fa', letterSpacing: '-0.3px' }}>
          Indica
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
