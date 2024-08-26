import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import { fileURLToPath, URL } from 'node:url';

export default mergeConfig(viteConfig, defineConfig({
    test: {
        reporters: ['html'],
        environment: 'jsdom',
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['html', 'text'],
            reportsDirectory: './html/ui', // Simplified path
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        root: fileURLToPath(new URL('./', import.meta.url))
    }
}));
