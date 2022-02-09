// 请求模块

import axios from 'axios'
import JSONBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'
// 引入vuex
import store from '@/store/index.js'

const request = axios.create({
  // 配置根路径
  baseURL: 'http://ttapi.research.itcast.cn/',
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // 此处使用JSON-bigint 对JSON.parse(),无法转化为正确数值的字符串转化为正确字符串
  transformResponse: [
    function(data) {
      // 对 data 进行任意转换处理
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})
// 新建一个只刷新token的axios的请求
const tokenRequest = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器 Add a request interceptor
request.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (store.state.user) {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器 Add a response interceptor
request.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  async function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response.status
    if (status === 401) {
      try {
        const res = await tokenRequest({
          method: 'put',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: 'Bearer ' + store.state.user.refresh_token
          }
        })
        const user = store.state.user
        user.token = res.data.data.token
        store.commit('setUser', user)
        return request(error.config)
      } catch (err) {
        // 设置跳转登录页面返回时的地址
        return router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
    } else if (status === 403) {
      Toast.fail('参数错误了呀兄弟')
    } else if (status === 404) {
      Toast.fail('网络不好了呀兄弟')
    } else if (status >= 500) {
      Toast.fail('服务器出问题了呀兄弟')
    }
    console.log('错了呀兄弟')
    return Promise.reject(error)
  }
)

export default request
