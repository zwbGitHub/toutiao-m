<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      :success-text="refreshSuccessText"
      v-model="isPullDownLoading"
      @refresh="onPullDownRefresh"
      :animation-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id.toString()"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import articleItem from '@/components/article-item/Index.vue'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载中loading的状态
      finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
      preTimestamp: Date.now(), // 每次请求的时间戳
      isPullDownLoading: false, //下拉刷新的loading
      refreshSuccessText: '', // 下拉刷新成功提示
      scrollTop: 0
    }
  },
  components: { articleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  activated() {
    this.$refs['article-list'].scrollTop = this.scrollTop
  },
  methods: {
    // 列表栏开始初始化或控制加载时，自动触发此事件
    async onLoad() {
      // 异步更新数据
      // 1.请求数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.preTimestamp, // 时间戳，请求当前数据时，需携带上次请求的返回的时间戳 pre_timestamp
        with_top: 1 // 是否包含置顶 1包含 0不包含
      })
      // console.log(data)
      // 2.请求数据完成后将数据添加到list数组中
      this.articles.push(...data.data.results)
      // 3.设置本次加载状态结束，加载时会自动改为true，加载完成时会改为false
      this.loading = false

      // 4.数据全部加载完成
      if (data.data.results.length) {
        this.preTimestamp = data.data.pre_timestamp
      } else {
        // finished改为true，为数据全部加载完成，不再触发加载更多
        this.finished = true
      }
    },
    // 下拉刷新触发事件
    async onPullDownRefresh() {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 下拉刷新向顶部添加数据
      this.articles.unshift(...data.data.results)
      // 关闭刷新加载时的loading标志
      this.isPullDownLoading = false
      // 刷新成功后的显示文本
      this.refreshSuccessText = `更新了${data.data.results.length}条数据`
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  overflow-y: auto;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
