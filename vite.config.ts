import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { siteApiPlugin } from './vite-plugin-site-api.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.ADMIN_USER) {
    process.env.ADMIN_USER = env.ADMIN_USER
  }
  if (env.ADMIN_PASSWORD) {
    process.env.ADMIN_PASSWORD = env.ADMIN_PASSWORD
  }

  return {
    plugins: [react(), siteApiPlugin()],
  }
})
