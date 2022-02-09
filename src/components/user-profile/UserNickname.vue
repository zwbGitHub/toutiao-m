<template>
  <div class="user-nickname">
    <van-nav-bar
      title="昵称"
      right-text="完成"
      left-text="取消"
      @click-left="$emit('closePopup')"
      @click-right="onConfirm"
    />
    <div class="field-bar">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { changeUserData } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      message: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm() {
      Toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0 //展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        await changeUserData({
          name: this.message
        })
        this.$emit('input', this.message)
        this.$emit('closePopup')
        Toast.success('修改成功')
      } catch (err) {
        Toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.field-bar {
  margin-top: 5px;
}
</style>
