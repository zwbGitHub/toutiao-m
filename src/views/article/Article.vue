<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
      class="app-nav-bar"
    >
      <template #right>
        <van-icon name="ellipsis" size="20px" />
      </template>
    </van-nav-bar>
    <div class="main-banner">
      <!-- 加载中 -->
      <van-loading color="#3296fa" vertical v-if="loading">加载中</van-loading>
      <!-- 加在完成 -文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <h3>{{ article.title }}</h3>
        <van-cell center>
          <van-image
            fit="cover"
            class="user-avator"
            slot="icon"
            :src="article.aut_photo"
          />
          <div slot="title">{{ article.aut_name }}</div>
          <div slot="label">{{ article.pubdate | relativeTime }}</div>
          <!--    <van-button
            v-if="!article.is_followed"
            slot="default"
            class="focus-user"
            type="info"
            size="small"
            round
            icon="plus"
            @click="onFollow"
            :loading="loadingFollow"
            >关注</van-button
          >
          <van-button
            v-else
            slot="default"
            class="focus-user"
            size="small"
            round
            @click="onFollow"
            :loading="loadingFollow"
            >已关注</van-button
          > -->
          <user-follow
            class="focus-user"
            :isFollowed="article.is_followed"
            :autId="article.aut_id"
            @changeFollowed="article.is_followed = $event"
          />
        </van-cell>
        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <article-comment
          :articleId="articleId"
          @send-comments="allComments = $event"
          :list="commentList"
        />
        <!-- /文章评论列表 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="popupShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="allComments" color="#777" />
          <!-- 收藏组件 -->
          <collect-article
            v-model="article.is_collected"
            :articleId="article.art_id"
          />
          <!-- 点赞组件 -->
          <like-article
            v-model="article.attitude"
            :articleId="article.art_id"
          />

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- /加载失败：404 -->
      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 底部写评论弹出层 -->
    <van-popup v-model="popupShow" position="bottom">
      <comment-post :target="article.art_id" @write-comment="addComment" />
    </van-popup>
  </div>
  <!-- 底部信息导航列表 -->
  <!--   <van-goods-action class="footer-nav">
      <van-goods-action-button
        text="写评论"
        @click="onClickButton"
        class="comment-btn"
      />
      <van-goods-action-icon @click="onClickIcon">
        <van-icon class-prefix="iconfont icon" name="dianzan" />
      </van-goods-action-icon>
      <van-goods-action-icon @click="onClickIcon" badge="5">
        <van-icon class-prefix="iconfont icon" name="pinglun" />
      </van-goods-action-icon>
      <collect-article/>
     
      <van-goods-action-icon @click="onClickIcon">
        <van-icon class-prefix="iconfont icon" name="fenxiang" />
      </van-goods-action-icon>
    </van-goods-action>  -->
</template>

<script>
import userFollow from '@/components/user-follow/UserFollow.vue'
import collectArticle from '@/components/collect-article/CollectArticle.vue'
import likeArticle from '@/components/like-article/LikeArticle.vue'
import CommentPost from '@/components/comment-post/CommentPost.vue'
import articleComment from './ArticleComment.vue'
import { getArticleInfo } from '@/api/article.js'
import { ImagePreview, Toast } from 'vant'

export default {
  data() {
    return {
      article: {},
      loading: true,
      errStatus: null,
      loadingFollow: false,
      allComments: 0,
      popupShow: false,
      commentList: []
    }
  },
  components: {
    userFollow,
    collectArticle,
    likeArticle,
    articleComment,
    CommentPost
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  created() {
    this.loadArticleInfo()
  },
  methods: {
    onClickRight() {
      console.log('导航栏')
    },
    async loadArticleInfo() {
      this.loading = true
      try {
        const { data } = await getArticleInfo(this.articleId)
        // console.log(data)
        this.article = data.data
        /*  this.$nextTick 无法获取当前文章区域的div标签
       this.$nextTick(()=>{
          const wrap = this.$refs['article-content']
           console.log(wrap);
       }) */
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    // 此事件实现文章里图片点击放大查看的效果
    previewImage() {
      const imgs = this.$refs['article-content'].querySelectorAll('img')
      const imgsSrc = []
      imgs.forEach((element, index) => {
        imgsSrc.push(element.src)
        element.addEventListener('click', () => {
          ImagePreview({
            images: imgsSrc,
            startPosition: index
          })
        })
      })
    },
    // 发布评论组件事件
    addComment(data) {
      this.commentList.unshift(data.new_obj)
      this.allComments++
      this.popupShow = false
    }
  }
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';
.article-container {
  .main-banner {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    width: 100%;
    box-sizing: border-box;
    .article-detail {
      width: 100%;
      box-sizing: border-box;
      .article-content {
        box-sizing: border-box;
        padding: 27px 16px;
        width: 100%;
        /deep/ div {
          text-align: justify;
        }
      }
    }
  }
}
.loading-wrap {
  padding: 100px 16x;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.error-wrap {
  padding: 100px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  .van-icon {
    font-size: 61px;
    color: #b4b4b4;
  }
  .text {
    font-size: 15px;
    color: #666666;
    margin: 16px 0 23px;
  }
  .retry-btn {
    width: 140;
    height: 35px;
    line-height: 35px;
    border: 1px solid #c3c3c3;
    font-size: 15px;
    color: #666666;
  }
}
.main-banner {
  h3 {
    padding: 0 16px;
    font-size: 20px;
  }
  .van-cell {
    background-color: rgb(245, 246, 249);
  }
  .user-avator {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 5px;
  }
  .focus-user {
    // font-size: 20px;
    height: 26px;
    width: 86px;
    margin: auto 0;
    font-size: 12px;
  }
}
.article-bottom {
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  /deep/.van-icon {
    font-size: 20px;

    /deep/ .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
</style>
