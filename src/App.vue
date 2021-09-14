<template>
  <div id="app">
    <keep-alive :include="layout">
    <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState(['layout'])
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
