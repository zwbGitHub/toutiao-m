import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { isLoading: false },
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/',
    meta: { isLoading: false },
    component: () => import('../views/layout/Index.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('../views/home/Home.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('../views/qa/Qa.vue')
      },
      {
        path: '/video', //
        name: 'video',
        component: () => import('../views/video/Video.vue')
      },
      {
        path: '/my', //
        name: 'my',
        component: () => import('../views/my/My.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    meta: { isLoading: false },
    component: () => import('../views/search/Search.vue')
  },
  {
    // 文章详情页
    path: '/article/:articleId',
    name: 'article',
    meta: { isLoading: false },
    component: () => import('../views/article/Article.vue'),
    props: true
  },
  // 编辑用户资料页面
  {
    path: '/user/profile',
    name: 'user-profile',
    meta: { isLoading: false },
    component: () => import('@/components/user-profile/UserProfile.vue')
  },
  // 聊天京京同学
  {
    name: 'chat',
    path: '/user/chat',
    meta: { isLoading: true },
    component: () => import('@/views/chat/UserChat.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLoading) {
    if (store.state.user) {
      next()
    } else {
      Dialog.confirm({
        title: '提示',
        message: '该功能需要登录才能访问，确认登陆吗'
      })
        .then(() => {
          // on confirm
          router.push({
            path: '/login',
            query: {
              redirect: from.path
              // redirect:router.currentRoute.fullPath
            }
          })
        })
        .catch(() => {
          // on cancel
          next(false)
        })
    }
  } else {
    next()
  }
})

export default router
