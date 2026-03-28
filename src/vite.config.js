import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['@orrery/core/saju', '@orrery/core/ziwei', '@orrery/core/natal']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
})