import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';
import { fileURLToPath, URL } from 'node:url';

export default mergeConfig(viteConfig, defineConfig({
    test: {
        exclude: [
            "./src/langs/**",
            "./src/router/**",
            "./src/assets/**",
            "./src/plugins/**",
            "**/docs/**",
            "**/docs-frontend/**",
            "**/html/**",
            "**/dist/**",
            "**/public/**"
        ],
        testTimeout: 10000, // 10 seconds
        reporters: ['html'],
        environment: 'jsdom',
        globals: true, // Makes expect globally available
        css: true,
        coverage: {
            exclude: [
                "./src/langs/**",
                "./src/router/**",
                "./src/assets/**",
                "./src/plugins/**",
                "**/docs/**",
                "**/docs-frontend/**",
                "**/html/**",
                "**/dist/**",
                "**/public/**"
            ],
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