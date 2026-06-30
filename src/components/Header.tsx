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
        background: 'rgba(10,22,40,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <a
        href="https://focusinteligente.com.br"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
      >
        {/* Logo mark */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="7" fill="url(#focus-grad)" />
          <path d="M9 14.5L12.5 18L19 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="focus-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563eb" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        {/* Logo text */}
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Focus</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#60a5fa', letterSpacing: '-0.3px' }}>Custom</span>
        </span>
      </a>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Badge */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'rgba(147,197,253,0.6)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 999,
          padding: '4px 10px',
        }}
      >
        Diagnóstico gratuito
      </span>
    </header>
  );
}
