export default function Footer() {
  return (
    <footer
      style={{
        padding: '24px 24px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        background: 'rgba(10,22,40,0.6)',
      }}
    >
      <span style={{ fontSize: 12, color: 'rgba(147,197,253,0.45)', fontWeight: 400 }}>
        Um produto criado pela
      </span>
      <a
        href="https://focusinteligente.com.br"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
      >
        <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="7" fill="url(#focus-grad-ft)" />
          <path d="M9 14.5L12.5 18L19 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="focus-grad-ft" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563eb" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#93c5fd' }}>FocusCustom</span>
      </a>
    </footer>
  );
}
