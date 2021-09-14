// postCSS 的配置文件
// postCSS 是基于node.js 的css处理工具
// 所以他的配置在node.js中
module.exports = {
  // 配置px 默认转化为rem
  plugins: {
    "postcss-pxtorem": {
      // 转换根元素的基准值
      // 正常情况下安设计稿来
      // 750宽的设计稿 用：750/10 = 75
      // 375宽的设计稿 用：375/10 = 37.5
      // vant默认基于375的逻辑像素来转化，实际搞为750实际输出
      //   要除以2
      rootValue: 37.5,
      // 需要转换的css属性 *号默认全部
      propList: ["*"],
      // 配置不要转化样式的资源
      exclude:  'github-markdown'
    }
  }
};
