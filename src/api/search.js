// 主页搜索栏请求事件
import request from '@/utils/request.js'

export const getSuggestion = value => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q: value
    }
  })
}
// 搜索结果请求
export const getResults = value => {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params: value
  })
}
// 获取用户搜索历史
export const getSearchHistory = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/search/histories'
  })
}
// 删除用户搜索历史
export const delSearchHistory = value => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories',
    params: value
  })
}
