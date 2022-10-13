/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    // See https://vitest.dev/guide/coverage.html
    coverage: { reporter: ['text', 'json', 'html'] },
    environment: 'jsdom',
    includeSource: ['components/**/*.{js,jsx,ts,tsx}'],
    exclude:['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/e2e/**']
  },
})
