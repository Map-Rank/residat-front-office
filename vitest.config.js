import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from '../residat-front-office/vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        reportsDirectory: 'html/ui',
        reporter: ['text', ['html', { subdir: 'coverage' }]],
        provider: 'v8'
      },
      reporters: ['default', 'html'],
      css: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
