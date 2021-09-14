<template>
  <van-list
    v-model="searchLoading"
    :finished="searchFinished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
  >
    <van-cell
      v-for="(item, index) in searchList"
      :key="index"
      :title="item.title"
    />
  </van-list>
</template>

<script>
import { getResults } from '@/api/search.js'
export default {
  data() {
    return {
      searchList: [],
      searchLoading: false,
      searchFinished: false,
      page: 1,
      perPage: 20,
      // 请求失败
      error: false
    }
  },
  props: ['searchText'],
  methods: {
    async onLoad() {
      try {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        const { data } = await getResults({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        this.searchList.push(...data.data.results)

        // 超时报错
        if (Math.random() > 0.5) {
          JSON.parse('dsnajndjsa')
        }
        
        // 加载状态结束
        this.searchLoading = false
        // 数据全部加载完成
        if (data.data.results.length) {
          this.page++
        } else {
          this.searchFinished = true
        }
      } catch (error) {
        this.error = true
        this.searchLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  position: fixed;
  top: 54px;
  bottom: 0;
  width: 100%;
  overflow: auto;
}
</style>
