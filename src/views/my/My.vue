<template>
  <div class="my-container">
    <!-- 拥有蓝色背景区域 -->
    <van-cell-group class="my-info" v-if="!user">
      <!-- 头像昵称编辑资料区域 -->
      <van-cell center class="base-info" :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button size="small" round class="edit-btn" @click="editUserForm"
          >编辑资料</van-button
        >
      </van-cell>
      <!-- 头条关注获赞区域 -->
      <van-grid :border="false" class="data-info">
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="num-span">{{ currentUser.art_count }}</div>
            <div class="text-span">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="num-span">{{ currentUser.follow_count }}</div>
            <div class="text-span">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="num-span">{{ currentUser.fans_count }}</div>
            <div class="text-span">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="num-span">{{ currentUser.like_count }}</div>
            <div class="text-span">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录显示蓝色区域 -->
    <van-cell-group class="my-info my-hide" v-if="!user"
      ><div
        class="avator-wrap"
        @click="
          $router.push({
            path: '/login',
            query: {
              redirect: '/my'
            }
          })
        "
      >
        <img src="./login-avator.png" class="login-avator" />
        <div>登录/注册</div>
      </div>
    </van-cell-group>
    <!-- 收藏区域 -->
    <van-grid :column-num="2" class="nav-grid margin-b-4">
      <van-grid-item
        icon="shoucang"
        text="收藏"
        icon-prefix="iconfont icon"
        class="nav-grid-item"
      />
      <van-grid-item
        icon="lishi"
        text="历史"
        icon-prefix="iconfont icon"
        class="nav-grid-item"
      />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="京京同学" class="margin-b-4" is-link to="/user/chat" />
    <van-cell v-if="user" title="退出登录" class="exit" @click="onQuit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog, Toast } from 'vant'
import { getCurrentUser } from '@/api/user.js'
export default {
  data() {
    return {
      currentUser: {} // 当前用户信息
    }
  },
  computed: {
    // 获取当前token值
    ...mapState(['user'])
  },
  // 获取用户数据
  async created() {
    try {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    } catch (error) {
      console.log('登录获取用户数据失败', error)
    }
  },
  methods: {
    // 点击退出按钮
    onQuit() {
      Dialog.confirm({
        title: '提示',
        message: '确认退出吗'
      })
        .then(() => {
          this.$store.commit('removeLogin')
        })
        .catch(() => {
          // Toast.success('取消已确认')
        })
    },
    // 编辑用户信息
    editUserForm() {
      this.$router.push({
        name: 'user-profile',
        params: {
          id: this.currentUser.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    width: 100%;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    height: 180px;
  }
  // 清除背景色
  .base-info {
    background: unset;
    height: 115px;
    box-sizing: border-box;
    padding-top: 38px;
    padding-bottom: 11px;
    .avatar {
      width: 66px;
      height: 66px;
      border: 1px rgb(236, 236, 236) solid;
      box-sizing: border-box;
      margin-right: 11px;
    }
    .name {
      color: #fff;
      font-size: 15px;
    }
    .edit-btn {
      // border: none;
      height: 20px;
      font-size: 11px;
      color: #666;
      line-height: 18px;
    }
  }
  .data-info {
    .data-info-item {
      width: 65px;
      height: 65px;
      box-sizing: border-box;
      color: #fff;
      text-align: center;
      .num-span {
        font-size: 18px;
      }
      .text-span {
        font-size: 11px;
      }
    }
  }
  /deep/ .nav-grid {
    background: #fff;
    .nav-grid-item {
      height: 70px;
      .iconfont {
        font-size: 22px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  /deep/ .van-grid-item__content {
    background: unset;
  }
}
// 退出按钮
.exit {
  text-align: center;
  color: #d86262;
}
.margin-b-4 {
  margin-bottom: 4.5px;
}
.my-hide {
  display: flex;
  justify-content: center;
  align-items: center;
  .avator-wrap {
    width: 66px;
    img {
      width: 100%;
    }
    div {
      font-size: 14px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
