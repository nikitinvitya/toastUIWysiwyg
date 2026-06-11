import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/toastUIWysiwyg/',
  plugins: [react()],
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
})
