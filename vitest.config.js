import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import { fileURLToPath, URL } from 'node:url'

export default mergeConfig(viteConfig, defineConfig({
    resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
    test: {
        reporters: ['html'],
        environment: 'jsdom',
        css: true,
        coverage: {
            provider: 'v8' ,// or 'v8'
            reporter: [ 'html','text',],
              reportsDirectory: './tests/unit/coverage'
          },
          root: fileURLToPath(new URL('./', import.meta.url))
      }
}))