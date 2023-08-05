import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(
        new URL('./node_modules/@patternfly/react-core/dist/styles/assets', import.meta.url)
      ),
    },
  },
})
