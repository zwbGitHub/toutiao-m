<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('closeBirthPupop')"
    @confirm="onConfirm"
  />
</template>

<script>
import { changeUserData } from '@/api/user.js'
import { Toast } from 'vant'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      minDate: new Date(1949, 9, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  props: ['value'],
  methods: {
    async onConfirm(value) {
      Toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0 //展示时长(ms)，值为 0 时，toast 不会消失
      })
      //   const timer =
      //     value.getFullYear() +
      //     '-' +
      //     (value.getMonth() + 1) +
      //     '-' +
      //     value.getDate() //传统时间对象转化格式方法
      const timer = dayjs(value).format('YYYY-MM-DD') //dayjs转化日期对象格式
      try {
        await changeUserData({
          birthday: timer
        })
        this.$emit('input', timer)
        this.$emit('closeBirthPupop')
        Toast.success('修改成功')
      } catch (err) {
        Toast.fail('修改失败')
      }
    }
  }
}
</script>

<style></style>
