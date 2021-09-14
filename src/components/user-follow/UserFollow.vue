<template>
  <van-button
    v-if="!isFollowed"
    slot="default" 
    type="info"
    size="small"
    round
    icon="plus"
    @click="onFollow"
    :loading="loading"
    >关注</van-button
  >
  <van-button
    v-else
    slot="default"
    size="small"
    round
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
</template>

<script>
import { getUserFollow, delUserFollow } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
        loading:false,
    }
  },
  props: ['isFollowed','autId'],
  methods: {
    // 用户关注事件
    async onFollow() {
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注，需要取消
          await delUserFollow(this.autId)
        } else {
          // 未关注，需要关注
          const { data } = await getUserFollow(this.autId)
          console.log(data)
        }
        this.$emit('changeFollowed',!this.isFollowed)
      } catch (err) {
        let message = '关注失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '用户不能关注自己' 
        }
        Toast(message)
      }
      
      this.loading = false
    }
  }
}
</script>

<style></style>
