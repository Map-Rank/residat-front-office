// module.exports = {
//     title: 'Hello VuePress',
//     description: 'Just playing around'
//   }

module.exports = {
    theme: '@vuepress/theme-blog', // empty means default theme
    plugins: [
      [
        '@vuepress/blog',
        // below used for specify the website config with blogs & tags
        {
          directories: [
            {
              // Unique ID of current classification
              id: 'documentation',
              // NOTE: Target directory, which means your readme file will have to stay under this directory
              dirname: 'posts',
              // Path of the `entry page` (or `list page`)
              path: '/',
              itemPermalink: '/:year/:month/:day/:slug',
              pagination: {
                lengthPerPage: 5
              }
            }
          ],
          frontmatters: [
            {
              id: 'tags',
              keys: ['tags'],
              path: '/tag/'
            }
          ]
        }
      ]
    ],
    themeConfig: {
      nav: [
        { text: 'Blog', link: '/' },
        { text: 'Tags', link: '/tag/' }
      ]
    }
  };
  