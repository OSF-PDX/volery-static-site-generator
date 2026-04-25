import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/volery-static-site-generator/' : '/',
  plugins: [react(), basicSsl()],
  build: {
    minify: false
  },
  preview:{
    https:true
  },
  server:{
    https:true,
    host: true
  }
})
