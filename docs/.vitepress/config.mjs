import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/residat-front-office',
  title: "Map and Rank Doc",
  description: "This is site is aim in presenting map and rank doc",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Home',
   
      }
    ],


  }
})