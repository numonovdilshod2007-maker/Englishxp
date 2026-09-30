import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase')) return 'firebase'
          if (id.includes('node_modules/animejs')) return 'anime'
          if (id.includes('node_modules/vue-router') || id.includes('node_modules/pinia') || id.includes('node_modules/vue')) return 'vendor'
        },
      },
    },
  },
})
