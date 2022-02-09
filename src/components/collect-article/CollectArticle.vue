<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    :class="{ showCollect: value }"
    @click="onClickIcon"
  />
</template>

<script>
import { getCollectArticle, delCollectArticle } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  data() {
    return {}
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onClickIcon() {
      try {
        if (this.value) {
          // 已收藏，需要取消
          await delCollectArticle(this.articleId)
        } else {
          // 未收藏，需要收藏
          await getCollectArticle(this.articleId)
        }
        this.$emit('input', !this.value)
        if (!this.value) {
          Toast.success('收藏成功')
        } else {
          Toast.success('已取消收藏')
        }
        Toast.success(this.value ? '已取消收藏' : '收藏成功')
      } catch (err) {
        Toast.fail('收藏失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.showCollect {
  color: rgb(254, 168, 0) !important;
}
</style>
