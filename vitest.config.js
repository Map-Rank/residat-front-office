import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';
import { fileURLToPath, URL } from 'node:url';
import { configDefaults } from 'vitest/config'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        reporters: ['html'],
        environment: 'jsdom',
        css: true,
        coverage: {
            provider: 'istanbul',
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
