<template>
  <div>
    <img :src="this.imgURL" width="100%" ref="image" />
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close-avator')"
      @click-right="onConfirm"
      class="bottom-bar"
    >
    </van-nav-bar>
  </div>
</template>

<script>
import { editUserImages } from '@/api/user.js'
import { Toast } from 'vant'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  data() {
    return {
      imgURL: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  props: ['file'],
  methods: {
    cropperPromiss() {
      return new Promise(resolve => {
        // 使用promise封装一下函数的返回值，然后就直接可以使用async和await进行取值
        this.cropper.getCroppedCanvas().toBlob(file => {
          resolve(file)
          console.log(file);
        })
      })
    },
    async onConfirm() {
      Toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0 //展示时长(ms)，值为 0 时，toast 不会消失
      })
      // 当 Content-Type的参数值要求为multipart/form-data时，请求体不能以｛｝
      // 的形式传输数据，需要用 new FormDate 进行数据传输
      const file = await this.cropperPromiss()
      const fd = new FormData()
      fd.append('photo', file)
      try {
        await editUserImages(fd)
        this.$emit('send-imgurl', window.URL.createObjectURL(file))
        this.$emit('close-avator')
        Toast.success('修改成功')
      } catch (err) {
        Toast.fail('更新头像失败')
      }
    }
  },
  mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      iewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style lang="less" scoped>
.bottom-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  /deep/ .van-nav-bar__text {
    color: #fff;
  }
}
/* Ensure the size of the image fit the container perfectly */
img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
// /deep/.cropper-container {
//   margin-top: 50%;
// }
</style>
