module.exports = {
  title: '前端知识收藏',
  description: 'If you don’t build YOUR dream, someone will hire you to build THEIRS!',
  dest: './dist',
  base: '/blog/',  // base路径
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#00adb5' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#00adb5' }],
    ['meta', { name: 'description', itemprop: 'description', content: 'horan的博客, 前端知识收藏' }],
    ['meta', { itemprop: 'name', content: 'horan-bolg' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    // 博客设置
    nav: [{
      text: '主页',
      link: '/',
      icon: 'reco-home'
    },
   
    // {
    //   text: '杂谈',
    //   link: '/say/',
    //   icon: 'reco-account'
    // },

    {
      text: '时间线',
      link: '/timeLine/',
      icon: 'reco-date'
    },
    // {
    //   text: '语雀',
    //   link: 'https://www.yuque.com/yuque/blog',
    //   icon: 'reco-twitter'
    // },

    {
      text: '我的作品',
      icon: 'reco-coding',
      items: [
        {
          text: 'AdminLTE',
          link: 'https://www.horan.top/adminifdoo/',
          icon: 'reco-category'
        },
        { text: 'javascript-basics', link: 'http://www.horan.top/javascript-basics/', icon: 'reco-blog' },
        { text: 'jQuery 1.3 API', link: 'https://www.horan.top/jquery-handbook/', icon: 'reco-api' },
      ]
    },
    {
      text: '联系我',
      icon: 'reco-message',
      items: [
        {
          text: '语雀',
          link: 'https://www.yuque.com/yuque/blog',
          icon: 'reco-twitter'
        },
        {
          text: 'GitHub',
          link: 'https://github.com/horanly/my_blog',
          icon: 'reco-github'
        },
        { text: '博客圆', link: 'https://www.cnblogs.com/horanly/', icon: 'reco-bokeyuan' },
        { text: '关于我', link: '/about/', icon: 'reco-account' }
      ]
    },
    ],
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: '文章分类' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      }
    },
    logo: '/images/head.jpg',
    // 博客设置
    type: 'blog',
    // 关闭华为文案
    huawei: false,
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'Horan',
    // 备案号
    // record: 'xxxx',
    // 项目开始时间
    startYear: '2018',
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['725361'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...', //your appId
    //   appKey: '...', // your appKey
    // }
    serviceWorker: {
      updatePopup: true,
    },
    lastUpdated: '最后一次修改于'
  },
  markdown: {
    lineNumbers: true
  },
  // plugins: ['@vuepress/medium-zoom', 'flowchart'],
  configureWebpack: {
    resolve: {
      alias: {
        '@img': 'assets/img'
      }
    }
  }
}