<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
    ></comment-item>
  </van-list>
</template>

<script>
import { getArticleComments } from '@/api/comment.js'
import CommentItem from './CommentItem.vue'
export default {
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      error: false
    }
  },
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getArticleComments({
          type: 'a',
          source: this.articleId.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data)
        const { results, total_count: totalCount } = data.data
        this.$emit('send-comments', totalCount)
        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
