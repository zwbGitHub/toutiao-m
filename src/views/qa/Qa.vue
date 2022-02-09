<template>
  <div>
    <van-tabs @disabled="onClickDisabled">
      <van-tab title="标签 1">
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  methods: {
    onClickDisabled(name, title) {
      Toast(name + '已被禁用')
    }
  }
}
</script>

<style scoped></style>
