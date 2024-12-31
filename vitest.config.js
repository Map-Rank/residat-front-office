import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';
import { fileURLToPath, URL } from 'node:url';

export default mergeConfig(viteConfig, defineConfig({
    test: {
        testTimeout: 10000, // 10 seconds
        reporters: ['html'],
        environment: 'jsdom',
        globals: true, // Makes expect globally available
        exclude: [
            // '/node_modules/',  // Ignorer les fichiers dans node_modules
            // '/dist/',           // Ignorer le dossier dist
            'src/langs/',         // Ignorer tous les fichiers dans le répertoire src/langs
            'src/stores/',        // Ignorer tous les fichiers dans le répertoire src/stores
            'src/router/',        // Ignorer tous les fichiers dans le répertoire src/router
            'html/assets/'        // Ignorer tous les fichiers dans le répertoire html/assets
        ],
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