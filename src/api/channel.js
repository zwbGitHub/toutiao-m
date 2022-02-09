// 频道请求相关模块

import request from '@/utils/request'
// 获取所有频道
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}
// 批量修改用户频道列表
export const changeUserChannels = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
// 批量删除用户频道列表
export const delUserChannels = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${target}`
  })
}
