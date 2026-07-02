export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '14px 24px',
        borderTop: '1px solid var(--surface-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        flexWrap: 'wrap',
        background: 'var(--footer-bg)',
      }}
    >
      <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
        Um produto criado pela
      </span>
      <a
        href="https://focusinteligente.com.br"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        aria-label="Focus"
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.2px',
            fontFamily: '"Montserrat Alternates", sans-serif',
          }}
        >
          Focus
        </span>
      </a>
    </footer>
  );
}

