import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/DND5R-easy-cc/', // 明确指定仓库路径，确保 GitHub Pages 资源加载正确
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true, // 恢复压缩
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/data/')) {
            return 'dnd-data';
          }
        }
      }
    }
  }
})



