// 文章请求相关模块

import request from '@/utils/request'

export const getArticles = (params)=>{
   return  request({
        method:'get',
        url:'/app/v1_1/articles',
        params
    })
}
// 获取文章信息
export const getArticleInfo = (articleId)=>{
    return  request({
         method:'get',
         url:`/app/v1_0/articles/${articleId}`,
     })
 }

// 收藏文章
export const getCollectArticle = (target)=>{
    return  request({
         method:'post',
         url:`/app/v1_0/article/collections`,
         data:{
             target
         }
     })
 }
// 取消收藏文章
export const delCollectArticle = (target)=>{
    return  request({
         method:'delete',
         url:`/app/v1_0/article/collections/${target}`,
     })
 }

 // 点赞文章
export const addLikeArticle = (target)=>{
    return  request({
         method:'post',
         url:`/app/v1_0/article/likings`,
         data:{
             target
         }
     })
 }
//取消点赞文章
export const delLikeArticle = (target)=>{
    return  request({
         method:'delete',
         url:`/app/v1_0/article/likings/${target}`,
     })
 }

// 写文章评论
export const writeComment = (data) => {
    return request({
        method:'post',
        url:'/app/v1_0/comments',
        data
    })
}