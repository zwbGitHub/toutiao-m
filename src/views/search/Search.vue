<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background=" #3296fa"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果组件 -->
    <result v-if="isResultShow" :searchText="searchText" />
    <!-- 搜索建议组件 -->
    <suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @sendText="onSearch"
    />
    <!-- 搜索历史组件 -->
    <history
      v-else
      :allHistory="allHistory"
      @delAllHistory="removeAllItems()"
      @searchHistory="onSearch"
      @delSomeHistory="delSomeHistory"
    />
  </div>
</template>

<script>
import suggestion from './components/Suggestion.vue'
import history from './components/History.vue'
import result from './components/Result.vue'
import { setItem, getItem, removeItem } from '@/utils/storage.js'
export default {
  data() {
    return {
      searchText: '',
      isResultShow: false,
      allHistory: getItem('search-history') || []
    }
  },
  components: { suggestion, history, result },
  methods: {
    // search搜索事件
    onSearch(text) {
      this.searchText = text
      this.isResultShow = true
      const localHistory = this.allHistory
      if (localHistory.indexOf(text) !== -1) {
        this.allHistory.splice(localHistory.indexOf(text), 1)
      }
      this.allHistory.unshift(this.searchText)
      setItem('search-history', this.allHistory)
    },
    removeAllItems() {
      removeItem('search-history')
      this.allHistory = []
    },
    delSomeHistory(index) {
      this.allHistory.splice(index, 1)
      setItem('search-history', this.allHistory)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-search__action:active {
  background-color: #3296fa;
}
</style>
