import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

// Config de teste separada do vite.config.ts (que carrega o plugin MCP da Lovable
// e não faz sentido num ambiente de teste puro em Node).
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
