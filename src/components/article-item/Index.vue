<template>
<!-- 首页文章列表单元组件 -->
<!-- :to="`/article/${article.art_id}`" -->
  <van-cell class="article-item" 
  :to="{
    name:'article',
    params:{
      articleId:article.art_id
    }
  }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-img-wrap" v-if="article.cover.type > 1">
        <div
          class="cover-img"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image fit="cover" :src="img" class="img" />
        </div>
      </div>
      <div class="label-text">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 默认插槽，可省略 -->
    <van-image
      class="right-img"
      v-if="article.cover.type === 1"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
    .right-img {
      width: 116px;
      height: 73px;
    }
  }
  .cover-img-wrap {
    display: flex;
    padding: 15px 0;
    .cover-img {
      flex: 1;
      flex-wrap: nowrap;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .img {
        width: 100%;
        height: 73px;
        vertical-align: bottom;
      }
    }
  }
  .label-text {
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>
