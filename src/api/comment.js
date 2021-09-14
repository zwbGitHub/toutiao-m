// 评论请求

import request from '@/utils/request.js'

// 获取评论
export const getArticleComments = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/comments',
    params
  })
}

//评论或评论回复点赞
export const addCommentLike = target => {
  return request({
    method: 'post',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论或评论回复点赞
export const delCommentLike = target => {
  return request({
    method: 'delete',
    url: `/app/v1_0/comment/likings/${target}`
  })
}
