<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="sendComment"
      :disabled="message ? false : true"
      >发布</van-button
    >
  </div>
</template>

<script>
import { writeComment } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async sendComment() {
      Toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0 // 默认展示两秒，设置此项即可持续展示，直到下次展示出现
      })
      try {
        const { data } = await writeComment({
          target: this.target,
          content: this.message,
          art_id: null
        })
        //console.log(data);
        this.$emit('write-comment', data.data)
        Toast.success('发布成功')
      } catch (err) {
        Toast.fail('发布失败')
      }
      this.message = ''
    }
  }
}
</script>
<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 16px 0 16px 16px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 75px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
