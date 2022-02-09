module.exports = {
    lintOnSave: false,
    // publicPath: '/',
    devServer: {
      // 首次编译成功直接打开浏览器
      open: true,
     /*  proxy: {
        '/api': {
          // target: 'http://api-toutiao-web.itheima.net',
          target: 'http://ttapi.research.itcast.cn/',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api/': ''
          }
        }
      } */
    },
    // css: {
    //   loaderOptions: {
    //     less: {
    //       modifyVars: {
    //         blue: '#3296FA',
    //         'text-color': '#333'
    //       }
    //     }
    //   }
    // }
  }
  