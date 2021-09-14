<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="!iconShow" @click="iconShow = true">
        <span @click="$emit('delAllHistory')">全部删除 </span>
        <span>完成</span>
      </div>
      <van-icon name="delete-o" v-if="iconShow" @click="iconShow = false" />
    </van-cell>
    <van-cell v-for="(item, index) in allHistory" :key="index" :title="item">
      <div slot="title" @click="clickHistory(item)">{{ item }}</div>
      <van-icon name="close" v-if="!iconShow" @click="delThisHistory(index)" />
    </van-cell>
  </div>
</template>

<script>
// import { getSearchHistory,delSearchHistory } from '@/api/search.js'
export default {
  data() {
    return {
      iconShow: true
    }
  },
  props: ['allHistory'],
  // 删除接口有问题
  // async created(){
  //   const data = await getSearchHistory()
  // },
  methods: {
    clickHistory(text) {
      this.$emit('searchHistory', text)
    },
    delThisHistory(index) {
      this.$emit('delSomeHistory', index)
    }
  }
}
</script>

<style></style>
