import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      ignored: ["**/db.json"]
    }
  },
  test: {
    globals: true,          
    environment: 'jsdom',       
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'lcov'], 
      exclude: ['node_modules/', 'tests/'],
    },
  }
})
