import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';
import { fileURLToPath, URL } from 'node:url';
import { configDefaults } from 'vitest/config'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        testTimeout: 10000, // 10 seconds
        reporters: ['html'],
        environment: 'jsdom',
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['html', 'text'],
            reportsDirectory: './html/ui',

        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        root: fileURLToPath(new URL('./', import.meta.url))
    }
}));
