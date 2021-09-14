<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        icon="good-job-o"
        :class="{
          'liking-btn': comment.is_liking
        }"
        :disabled="btnDisabled"
        @click="onLikeUp"
        >{{ comment.like_count || '赞' }}</van-button
      >
    </div>
    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button class="reply-btn" round
          >回复{{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>
<script>
import { addCommentLike, delCommentLike } from '@/api/comment.js'
import { Toast } from 'vant'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      btnDisabled: false
    }
  },
  methods: {
    async onLikeUp() {
      this.btnDisabled = true
      try {
        if (this.comment.is_liking) {
          // 已点赞，需要取消点赞
          await delCommentLike(this.comment.com_id)
          this.comment.like_count--
        } else {
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
        }
        this.comment.is_liking = !this.comment.is_liking
        this.btnDisabled = false
      } catch (err) {
        this.btnDisabled = false
        Toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 12.5px;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 13px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 11px;
    color: #222;
    margin-right: 12.5px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 70px;
    height: 24px;
    line-height: 24px;
    font-size: 11.5px;
    color: #222;
  }
  .like-btn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 13px;
    line-height: 15px;
    margin-right: 4px;
    .van-icon {
      font-size: 15px;
    }
  }
  .liking-btn {
    color: hotpink;
  }
}
</style>
