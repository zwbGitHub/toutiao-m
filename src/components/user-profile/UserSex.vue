<template>
  <van-picker
    show-toolbar
    title="性别"
    :columns="columns"
    :default-index="sex"
    @cancel="$emit('closeSexPupop')"
    @change="onChange"
    @confirm="onConfirm"
  />
</template>

<script>
import { changeUserData } from '@/api/user.js'
import {Toast } from 'vant'
export default {
  data() {
    return {
      columns: ['男', '女'],
      sex: this.value
    }
  },
  props: ['value'],
  methods: {
    onChange(picker, value, index) {
      this.sex = index
    },
    async onConfirm() {
      Toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0 //展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        await changeUserData({
          gender: this.sex
        })
        this.$emit('input', this.sex)
        this.$emit('closeSexPupop')
        Toast.success('修改成功')
      } catch (error) {
        Toast.fail('修改失败')
      }
    }
  }
}
</script>

<style></style>
