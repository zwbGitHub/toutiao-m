import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getItem, setItem, removeItem } from '@/utils/storage'

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 当前用户的登录状态（含有）
    user: getItem(USER_KEY),
    layout: []
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为防止页面刷新丢失,使得token持久化
      setItem(USER_KEY, state.user)
    },
    // 退出登录清除本地存储的token
    removeLogin(state, value) {
      removeItem(USER_KEY)
      state.user = getItem(USER_KEY)
    },
    // 实现组件缓存
    addCachePage(state, value) {
      if (!state.layout.includes(value)) {
        state.layout.push(value)
      }
    },
    // 卸载组件缓存
    removeCachePage(state, value) {
      if (state.layout.indexOf(value) !== -1) {
        state.layout.splice(state.layout.indexOf(value), 1)
      }
    }
  },
  actions: {},
  modules: {}
})
