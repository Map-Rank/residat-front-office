import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Map and Rank Doc",
  description: "This is site is aim in presenting map and rank doc",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Developer', link: '/setup-testing' }
    ],

    sidebar: [
      {
        text: 'Pages',
        items: [
          { text: 'Project Setup and Testing ', link: '/setup-testing' },
          { text: 'State and Components', link: '/state-component' },
          { text: 'API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      // { icon: 'github', link: 'https://github.com/Map-Rank/residat-front-office' }
    ]
  }
})
