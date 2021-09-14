<template>
  <div class="wrapper">
    <van-nav-bar
      class="app-nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    /><!-- 点击返回上一级菜单 -->
    <!-- 登录表单 -->
    <!-- 表单提交触发submit事件 -->
    <!-- show--关闭默认的红色的验证失败提示消息 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        required
        center
        icon-prefix="iconfont icon"
        left-icon="shouji"
        :rules="formRules.userMobile"
        placeholder="请输入手机号"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        center
        clearable
        required
        icon-prefix="iconfont icon"
        left-icon="yanzhengma"
        :rules="formRules.userCode"
        placeholder="请输入短信验证码"
        name="code"
      >
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-btn"
            size="small"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-container">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      user: {
        mobile: '13611111111',
        code: '246810'
      },
      formRules: {
        userMobile: [
          { required: true, message: '请填写手机号' },
          // 正则验证手机号
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        userCode: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      // 发送验证码后显示加载图形
      isSendSmsLoading: false
    }
  },
  methods: {
    ...mapMutations(['removeCachePage']),
    // 登录按钮触发事件
    async onLogin() {
      Toast.loading({
        message: '登录中...',
        // loading时禁止背景点击
        forbidClick: true,
        // 持续展示
        duration: 0
      })
      try {
        // 登录请求，返回数据获取token值，并且存储到本地储存
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        // console.log(data)
        Toast.success('登陆成功')
        // 此处删除路由缓存加载
        this.removeCachePage('layout')
        // back在此处存在bug
        // this.$router.back()
        // 登录后跳转上一次跳转时的页面
        this.$router.replace(this.$route.query.redirect || '/')
        // this.$router.push('/my')
      } catch (error) {
        Toast.fail('登录失败，手机号或验证码错误')
      }
    },
    // 登录验证失败回调
    onFailed(err) {
      // console.log('验证失败', err)
      if (err.errors[0]) {
        Toast({
          message: err.errors[0].message,
          // 将提示显示到顶部
          position: 'top'
        })
      }
    },
    // 验证码按钮点击事件
    async onSendSms() {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 加载小圆圈,防止网速慢用户多次点击触发多次触发请求
        this.isSendSmsLoading = true
        // 验证通过请求发送验证码
        await sendSms(this.user.mobile)
        // 隐藏发送按钮并显示倒计时
        this.isCountDownShow = true
      } catch (error) {
        // console.dir(error)
        let message = ''
        // 过滤发送验证码服务器返回的错误
        if (error && error.response && error.response.status === 429) {
          message = '发送太频繁，请销后重试'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败，重新发送吧'
        }
        Toast({
          message: message,
          position: 'top'
        })
        // console.log(error)
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
}
.wrapper::after {
  content: '隐私条款';
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}
.login-btn-container {
  padding: 26px 16px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
    font-size: 15px;
  }
}
.send-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 78px;
  height: 22px;
  color: #666;
  background-color: #ededed;
  .van-button__text {
    font-size: 11px;
  }
}
.van-count-down {
  height: 100%;
}
</style>
