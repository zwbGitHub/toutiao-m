// 用户相关请求模块
import request from '../utils/request'

// 登录注册
export function login(data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送短信验证码
export function sendSms(mobile) {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 登录获取用户信息
export const getCurrentUser = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
// 关注用户
export const getUserFollow = target => {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const delUserFollow = target => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${target}`
  })
}

// 获取用户个人资料
export const getUserProfile = target => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile',
    params: {
      target
    }
  })
}

// 修改个人资料
export const changeUserData = data => {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/profile',
    data
  })
}

// 编辑用户照片资料
export const editUserImages = data => {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/photo',
    data
  })
}
