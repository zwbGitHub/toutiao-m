<template>
  <div class="suggestion-container">
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('sendText', item)"
    >
      <div slot="title" v-html="highLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search.js'
// 引入lodash防抖函数
import { debounce } from 'lodash'
export default {
  data() {
    return {
      // search 建议框请求返回数据
      suggestions: []
    }
  },
  props: ['searchText'],
  methods: {
    // 输入后形成后台推荐数据响应
    async loadSearchSuggestion(value) {
      try {
        const { data } = await getSuggestion(value)
        this.suggestions = data.data.options
      } catch (error) {}
    },
    // 正则表达式// 之间的内容都会当做匹配字符来使用
    // 如果需要数据变量动态绑定正则表达式，则需用 new RegExp()
    // RegExp 正则表达式构造函数 参数一：匹配模式的字符串，根据字符串创建对象， 参数二：匹配模式，要写为字符串格式
    // suggestion与搜索值相同显示高亮
    highLight(str) {
      const zeStr = new RegExp(this.searchText, 'gi')
      // 字符串replace（）方法，实现参数一替换为参数二
      return str.replace(
        zeStr,
        `<span style="color:#3296fa">${this.searchText}</span>`
      )
    }
  },
  watch: {
    searchText: {
      immediate: true,
      // lodash debounce方法实现防抖，即输入后0.5S之后会发送请求
      handler: debounce(function(value) {
        this.loadSearchSuggestion(value)
      }, 300)
    }
  }
}
</script>

<style></style>
