<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      left-arrow
      class="app-nav-bar"
      @click-left="$router.back()"
    />
    <!-- 头像input file 表单 -->
    <input type="file" hidden ref="file" accept="image/*" @change="iptChange" />
    <van-cell
      title="头像"
      value="内容"
      center
      is-link
      @click="$refs.file.click()"
    >
      <van-image slot="default" class="avator" round cover :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="nicknameShow = true"
    />
    <van-cell title="介绍" value="内容" is-link />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="sexShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="birthdayShow = true"
    />
    <!-- 修改头像弹出层 -->
    <van-popup v-model="avatorShow" position="bottom" 
    class="avator-wrap">
      <user-avator
        :file="imgObject"
        v-if="avatorShow"
        @close-avator="avatorShow = false"
        @send-imgurl="user.photo = $event"
      />
    </van-popup>
    <!-- 修改昵称弹出层 -->
    <van-popup v-model="nicknameShow" position="bottom" class="popup-wrap">
      <user-nickname
        v-model="user.name"
        v-if="nicknameShow"
        @closePopup="nicknameShow = false"
      />
    </van-popup>
    <!-- 修改性别弹出层 -->
    <van-popup v-model="sexShow" position="bottom">
      <user-sex
        v-model="user.gender"
        v-if="sexShow"
        @closeSexPupop="sexShow = false"
      />
    </van-popup>
    <!-- 修改生日弹出层 -->
    <van-popup v-model="birthdayShow" position="bottom">
      <user-birthday
        v-model="user.birthday"
        v-if="birthdayShow"
        @closeBirthPupop="birthdayShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UserNickname from './UserNickname.vue'
import { Toast } from 'vant'
import UserSex from './UserSex.vue'
import UserBirthday from './UserBirthday.vue'
import UserAvator from './UserAvator.vue'
export default {
  data() {
    return {
      user: {},
      nicknameShow: false,
      sexShow: false,
      birthdayShow: false,
      avatorShow: false,
      imgObject: null
    }
  },
  created() {
    this.getUser()
  },
  components: { UserNickname, UserSex, UserBirthday, UserAvator },
  props: [],
  methods: {
    async getUser() {
      try {
        const { data } = await getUserProfile(this.$route.params.id)
        // console.log(data)
        this.user = data.data
      } catch (err) {
        Toast.fail('获取信息失败，请刷新页面重试')
      }
    },
    // input 默认change事件
    iptChange() {
      this.avatorShow = true
      // 此方法获取当前图片对象的blob信心
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      // console.log(blob);
      this.imgObject = this.$refs.file.files[0]
      // 以下操作时防止同一张照片下次不能选中，这是input表单的默认情况
      this.$refs.file.value = ''
      // console.log(this.$refs.file.value)
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avator {
    height: 30px;
    width: 30px;
    vertical-align: bottom;
  }
  .popup-wrap {
    background-color: rgb(245, 246, 249);
    height: 100%;
  }
  .avator-wrap{
      height: 100%;
      background-color: #000;
  }
}
</style>
