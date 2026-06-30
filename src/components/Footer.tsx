import focusLogo from '@/assets/focus-logo.png.asset.json';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '24px 24px',
        borderTop: '1px solid var(--surface-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        background: 'var(--footer-bg)',
      }}
    >
      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>
        Um produto criado pela
      </span>
      <a
        href="https://focusinteligente.com.br"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        aria-label="Focus"
      >
        <img
          src={focusLogo.url}
          alt="Focus"
          style={{ height: 22, width: 'auto', filter: 'var(--logo-filter)' }}
        />
      </a>
    </footer>
  );
}
