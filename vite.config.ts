import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/DND5R-easy-cc/', // GitHub Pages 部署路径（新仓库）
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 将警告阈值调高到 1000kb (1MB)，因为 DND 数据本身文本量就很大，这是合理的
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // 核心优化：手动分包
        manualChunks(id) {
          // 1. 将第三方依赖（如 React, Lucide）拆分到 vendor.js
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // 2. 将庞大的数据文件（data 目录）拆分到 dnd-data.js
          // Use safer check for data folder
          if (id.indexOf('data') !== -1 && (id.endsWith('.ts') || id.endsWith('.tsx'))) {
            return 'dnd-data';
          }
        }
      }
    }
  }
})
