module.exports = {
  title: '前端知识收藏', 
  description: 'horan的博客, 前端知识收藏',
  dest: './dist',
  base: '/blog/',  // base路径
  head: [
      ['link', { rel: 'icon', href: '/images/favicon.ico' }],
      ['meta', { name: 'theme-color', content: '#00adb5' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
      ['meta', { name: 'msapplication-TileColor', content: '#00adb5' }],
      ['meta', {name: 'description', itemprop: 'description', content: 'horan的博客, 前端知识收藏' }],
      ['meta', { itemprop: 'name', content: 'horan-bolg' }],
  ],
  themeConfig: {
    nav: [
        { text: '主页', link: '/blog/' },
        { text: '博文',
          items: [
            { text: 'html && http', link: '/html/' },
            { text: 'css && sass', link: '/style/' },
            { text: 'js && ts', link: '/javascript/' },
            { text: 'nodeJs', link: '/nodeJs/' },
            { text: 'vueJs', link: '/vueJs/' },
            { text: 'reactJs', link: '/reactJs/' },
            { text: 'JAVA', link: '/java/' },
            { text: '其他', link: '/other/' },
          ] 
        },
        { text: '关于', link: '/about/' },
        { text: 'Github', link: 'https://github.com/horanly/my_blog' },
    ],
    sidebar: {
        '/javascript/': ["javascript", "javascript2"]
        },
    sidebarDepth: 2,
    lastUpdated: 'Last Updated', 
},
}