interface Props {
  size?: number;
  className?: string;
  animated?: boolean;
}

export default function FocusIndicaLogo({ size = 40, className = '', animated = true }: Props) {
  const rootClass = animated ? 'fi-logo fi-logo-root' : 'fi-logo';
  return (
    <svg
      className={`${rootClass} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="fiCore" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#a5b4fc" />
          <stop offset="0.55" stopColor="#6366f1" />
          <stop offset="1" stopColor="#4338ca" />
        </radialGradient>
        <radialGradient id="fiHalo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#6366f1" stopOpacity="0.55" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Órbita externa decorativa (rotação inversa lenta) */}
      <g className="fi-orbit-outer" style={{ transformOrigin: '256px 256px' }}>
        <circle
          cx="256"
          cy="256"
          r="232"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="4"
          strokeDasharray="2 12"
          strokeLinecap="round"
        />
      </g>

      {/* Halo do núcleo (pulsa em opacidade) */}
      <circle className="fi-halo" cx="256" cy="256" r="150" fill="url(#fiHalo)" />

      {/* Órbita principal (grupo inteiro gira, partículas orbitam junto) */}
      <g className="fi-orbit-main" style={{ transformOrigin: '256px 256px' }}>
        <g transform="rotate(-22 256 256)">
          <ellipse
            cx="256"
            cy="256"
            rx="200"
            ry="96"
            fill="none"
            stroke="#a5b4fc"
            strokeWidth="10"
            strokeOpacity="0.95"
            strokeLinecap="round"
          />
          <circle cx="456" cy="256" r="22" fill="#f59e0b" />
          <circle cx="456" cy="256" r="22" fill="none" stroke="#fbbf24" strokeWidth="3" strokeOpacity="0.7" />
          <circle cx="56" cy="256" r="12" fill="#818cf8" />
        </g>
      </g>

      {/* Núcleo (pulsa em escala) */}
      <g className="fi-core" style={{ transformOrigin: '256px 256px' }}>
        <circle cx="256" cy="256" r="86" fill="url(#fiCore)" />
        <circle cx="256" cy="256" r="86" fill="none" stroke="#c7d2fe" strokeWidth="3" strokeOpacity="0.65" />
      </g>

      {/* Crosshair / mira (pisca) */}
      <g className="fi-crosshair" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.95">
        <line x1="256" y1="196" x2="256" y2="220" />
        <line x1="256" y1="292" x2="256" y2="316" />
        <line x1="196" y1="256" x2="220" y2="256" />
        <line x1="292" y1="256" x2="316" y2="256" />
      </g>
      <circle className="fi-crosshair-dot" cx="256" cy="256" r="10" fill="#ffffff" />
    </svg>
  );
}
