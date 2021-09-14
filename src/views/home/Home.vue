<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <template #title>
        <van-button
          icon="search"
          type="info"
          round
          class="searchBtn"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs v-model="active"  class="channel-tabs">
      <van-tab
        class="channel-tabs-item"
        v-for="channel in userChannels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章频道列表 -->
        <!-- 使用组件即时生成各个类别的文章列表，不访问不加载，访问后会加载并且会形成缓存 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
      <!-- 添加一个占位元素，防止最后一个元素被按钮挡住 -->
      <div slot="nav-right" class="edit-show-placeholder"></div>
      <!-- 插入频道编辑图标 -->
      <div
        slot="nav-right"
        @click="isChannelEditShow = true"
        class="edit-show-icon"
      >
        <van-icon name="wap-nav"></van-icon>
      </div>
    </van-tabs>
    <!-- 右上角班级频道弹出层弹出层,并将其挂载在body标签上-->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      get-container="body"
      close-icon-position="top-left"
      class="channel-popup-style"
    >
      <!-- 模板中的$event 表示时间参数 -->
      <!-- 此处加你两个全局事件用来进行子组件参数的传递 -->
      <channel-edit
        :userChannels="userChannels"
        @close="isChannelEditShow = false"
        @sendActive="active = $event"
        :active="active"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import articleList from './components/Article-list.vue'
import channelEdit from './components/Channel-edit.vue'
import { getItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      active: 0, // 控制被激活的标签索引值
      userChannels: {}, // 频道列表
      isChannelEditShow: false // 控制频道弹出层状态
    }
  },
  components: { articleList, channelEdit },
  async created() {
    // 根据用户有没有登录，获取本地存储的userChannels
    if (this.user || !getItem('user-channels')) {
      // 获取tab栏数据
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
    } else {
      this.userChannels = getItem('user-channels')
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
 /*  .app-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  } */
  .searchBtn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    font-size: 14px;
    .van-icon {
      font-size: 16px;
    }
  }
  /deep/.channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      padding: 0 25px;
      flex: 1 0 auto;
    }
  }
  /deep/.van-tabs__line {
    width: 15px;
    height: 3px;
    background-color: #3296fa;
    top: 34px;
    left: 0;
  }
  .edit-show-icon {
    position: fixed;
    font-size: 24px;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.7;
    &::before {
      position: absolute;
      content: '';
      width: 1px;
      height: 35px;
      background-color: #aaacaf;
      left: 0;
    }
  }
  .edit-show-placeholder {
    width: 24px;
    height: 43px;
    background-color: #fff;
    flex: 1 0 auto;
    border-bottom: 1px solid #edeff3;
  }
}
.channel-popup-style {
  height: 100%;
}
</style>
