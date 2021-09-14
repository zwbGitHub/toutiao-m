import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/icon.css'
import './vant/index.js'
// 加载自动设置rem基准值（HTML标签字体大小）
import 'amfe-flexible'
// 全局样式放在最后，方便覆盖第三方样式
import './styles/index.css'
// 引入相对时间过滤器
import './utils/day'
Vue.config.productionTip = false
/* import {button} from 'vant'
Vue.use(button) */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
