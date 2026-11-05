import { pwaBuild } from './scripts/pwa-build';
import { androidAssets } from './scripts/android-assets';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const android = mode === 'android';
    return {
        plugins: [
            react(),
            android ? androidAssets() : pwaBuild(),
        ],
        publicDir: android ? false : 'public',
        base: android ? '/' : '/DND5R-easy-cc/',
        build: {
            outDir: android ? 'dist-android' : 'dist',
            assetsDir: 'assets',
            sourcemap: false,
            minify: true, // 恢复压缩
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('@3d-dice') || id.includes('@babylonjs'))
                            return 'dice-vendor';
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
    };
});
