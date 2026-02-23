import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  if (!env.VITE_APP_API_URL) {
    throw new Error("➡️ VITE_APP_API_URL is not defined")
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5001,
      proxy: {
        "/api": {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})