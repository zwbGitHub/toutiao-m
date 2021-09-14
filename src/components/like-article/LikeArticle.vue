<template>
  <van-icon
    color="#777"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ likeColor: value === 1 }"
    @click="addLike"
  />
</template>

<script>
import { addLikeArticle, delLikeArticle } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  data() {
    return {}
  },
  props: {
    value: {
      required: true
    },
    articleId: {
      type: [Object, Number],
      required: true
    }
  },
  methods: {
    async addLike() {
      let index = 1
      try {
        if (this.value === 1) {
          // 已点赞，取消点赞
          await delLikeArticle(this.articleId)
          index = -1
        } else {
          // 未点赞，需要点赞
          await addLikeArticle(this.articleId)
          index = 1
        }
        this.$emit('input', index)
        Toast.success(index === 1 ? '点赞成功' : '已取消点赞')
      } catch (err) {
        Toast.fail('点赞失败')
      }
    }
  }
}
</script>

<style>
.likeColor {
  color: #e5645f !important;
}
</style>
