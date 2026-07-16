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
      },
    },
  },
  plugins: [],
}
