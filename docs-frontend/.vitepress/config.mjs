import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Residat Docs",
  description: "This site has the documentation of the residat project for a potential frontend developer",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo-small.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/setup-testing' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Project Setup', link: '/setup-testing' },
          { text: 'State and Component Management', link: '/state-component' },
          { text: 'API', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
