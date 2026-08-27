/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: {
          base: '#0a0a1a',
          elev: '#141432',
          elev2: '#1e1e5a',
        },
        accent: {
          DEFAULT: '#4f46e5',
          soft: 'rgba(79,70,229,0.12)',
          border: 'rgba(79,70,229,0.3)',
        },
        // Tokens semânticos — resolvem por tema (ver src/index.css)
        fg: {
          DEFAULT: 'var(--text-primary)',
          soft: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          accent: 'var(--text-accent)',
        },
        card: {
          DEFAULT: 'var(--card)',
          strong: 'var(--card-strong)',
          deep: 'var(--card-deep)',
        },
        hairline: 'var(--border-hairline)',
        'border-soft': 'var(--border-soft)',
      },
    },
  },
  plugins: [],
}
