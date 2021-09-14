<template>
  <div>
    <van-nav-bar
      class="app-nav-bar"
      title="京京同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息显示列表 -->
    <van-cell-group class="message-list" ref="message-list">
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
    <!-- 底部输入框 -->
    <van-field
      class="message-field"
      v-model="message"
      center
      clearable
      placeholder="请输入消息"
    >
      <template #button>
        <van-button
          class="send-btn"
          size="small"
          type="primary"
          @click="onSendMessage"
          >发送</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'
export default {
  data() {
    return {
      message: '',
      socket: null,
      // [ { message: '消息数据', isMe: true, photo: '头像' }, ]
      messages: getItem('chat-messages') || []
    }
  },
  watch: {
    messages(newValue) {
      setItem('chat-messages', newValue)
      // 让列表滚动到最底部
      const messageList = this.$refs['message-list']
      // 这里需要把操作 DOM 的这个代码放到 $nextTick 中
      // 为啥？明天再说
      this.$nextTick(() => {
        messageList.scrollTop = messageList.scrollHeight
      })
    }
  },
  created() {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.$store.state.user
      }
    })

    // 把 socket 存储到 data 中，然后就可以在 methods 中访问到了
    this.socket = socket

    // 当客户端与服务器建立连接成功，触发 connect 事件
    socket.on('connect', () => {
      console.log('建立连接成功！')
    })

    // 监听接收服务端消息
    socket.on('message', data => {
      console.log('收到服务器消息：', data)
      this.messages.push({
        message: data.msg,
        isMe: false,
        photo: 'http://toutiao.meiduo.site/FkBUsGwtrHKjoF0NPLzeilckol1-'
      })
    })
  },

  mounted() {
    const messageList = this.$refs['message-list']
    messageList.scrollTop = messageList.scrollHeight
  },

  methods: {
    onSendMessage() {
      const message = this.message.trim()
      if (!message) {
        return
      }

      // 发送消息
      this.socket.emit('message', {
        msg: message,
        timestamp: Date.now()
      })

      // 把消息存储到数组中
      this.messages.push({
        message,
        isMe: true,
        photo: 'https://img.yzcdn.cn/vant/cat.jpeg'
      })
      // 清空文本框
      this.message = ''
    }
  }
}
/* import io from 'socket.io-client'
export default {
  data() {
    return {
      message: '',
      socket: null,
      messages: []
    }
  },
  props: [],
  created() {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    // 当客户端与服务器建立连接成功，触发 connect 事件
    socket.on('connect', () => {
      console.log('建立连接成功！')
    })
    // 监听接收服务端消息
    socket.on('message', data => {
      console.log('收到服务器消息：', data)
    })
    // 监听接收服务端消息

    socket.on('message', data => {
      console.log('收到服务器消息：', data)
      this.messages.push({
        message: data.msg,
        isMe: false,
        photo: 'http://toutiao.meiduo.site/FkBUsGwtrHKjoF0NPLzeilckol1-'
      })
    })
  },
  methods: {
    // 发送按钮
    sendMessage() {
      const message = this.message.trim()
      if (!message) {
        return
      }
      // 发送消息
      this.socket.emit('message', {
        msg: message,
        timestamp: Date.now()
      })
    }
  }
} */
</script>

<style lang="less" scoped>
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 53px;
  overflow-y: auto;
}
.message-field {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.send-btn {
  padding: 0 15px;
}
</style>
