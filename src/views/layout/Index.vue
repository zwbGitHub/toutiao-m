<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 底部tab栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" replace to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" replace to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" replace to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'layout',
  data() {
    return {
      active: 0
    }
  },
  methods: {
    ...mapMutations(['addCachePage'])
  },
  // 此处添加路由组件缓存
  mounted() {
    this.addCachePage('layout')
  }
}
</script>

<style></style>
