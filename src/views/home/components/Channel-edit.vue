<template>
  <div class="channel-edit">
    <!-- 我的频道部分 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        round
        plain
        size="mini"
        @click="isCloseIcon = !isCloseIcon"
        >{{ isCloseIcon ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="8">
      <!-- 此处 :class="{ active: index === active }" 意思为当前索引等于active时，class的active类名被激活，否则失效 -->
      <van-grid-item
        v-for="(channel, index) in userChannels"
        :key="channel.id"
        :text="channel.name"
        class="channel-item"
        :class="{ active: index === active }"
        :icon="isCloseIcon && index !== 0 ? 'clear' : ''"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>
    <!-- 频道推荐部分 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="8">
      <van-grid-item
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        class="channel-item"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  changeUserChannels,
  delUserChannels
} from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  data() {
    return {
      // 所有频道
      allChannels: [],
      isCloseIcon: false
    }
  },
  props: ['userChannels', 'active'],
  created() {
    this.getChannels()
  },
  computed: {
    // 推荐频道，数组筛选方法
    recommendChannels() {
      return this.allChannels.filter(item => {
        return !this.userChannels.some(userItem => {
          return userItem.id === item.id
        })
      })
    },
    ...mapState(['user'])
  },
  methods: {
    async getChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
      /* let a = new Set(this.allChannels);
    let b = new Set(this.userChannels);
     this.recommendChannels =  [...new Set([...a].filter(x => !b.has(x)))] */
    },
    // 推荐频道点击添加事件
    async onAddChannel(channel) {
      this.userChannels.push(channel)
      // 数据持久化
      if (this.user) {
        // 由于后端问题无法实现持久化,请求可以成功
        await changeUserChannels({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ]
        })
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    // 我的频道点击事件
    onUserChannelClick(channel, index) {
      // 编辑状态，删除频道
      if (this.isCloseIcon) {
        this.deleteChannel(channel, index)
      } // 非编辑状态，切换频道
      else {
        this.switchChannel(index)
      }
    },
    // 编辑状态，删除频道
    async deleteChannel(channel, index) {
      if (index !== 0) {
        this.userChannels.splice(index, 1)
        // 实现删除数据持久化
        if (this.user) {
          // 由于后端问题无法实现持久化
          await delUserChannels(channel.id)
        } else {
          setItem('user-channels', this.userChannels)
        }
      }
      // 解决删除高亮标签时索引值不变，而引起高亮标签改变的情况
      if (index <= this.active) {
        this.$emit('sendActive', this.active - 1)
      }
    },
    // 非编辑状态，切换频道
    switchChannel(index) {
      this.$emit('close')
      this.$emit('sendActive', index)
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .channel-item {
    width: 80px;
    height: 43px;
    font-size: 20px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        margin: 0;
      }
    }
  }
  /deep/ .van-grid-item__icon {
    position: absolute;
    right: -7px;
    top: -7px;
    font-size: 20px;
    color: #ccc;
  }
  /deep/.active {
    .van-grid-item__text {
      color: red;
    }
  }
}
.van-button--mini {
  height: 20px;
  padding: 0 15px;
  font-size: 12px;
  top: -3px;
}
</style>
