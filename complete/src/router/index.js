import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/',
    component: () => import('../components/Base.vue'),
    meta: {
      title: '公共部分'
    },
    children: [{
      path: '/index',
      component: () => import('../page/Home.vue'),
      meta: {
        title: '系统首页'
      }
    },
    {
      path: '/message',
      component: () => import('../page/message.vue'),
      meta: {
        title: '我的信息'
      }
    },
    {
      path: '/group',
      component: () => import('../page/group.vue'),
      meta: {
        title: '群组管理'
      }
    },
    {
      path: '/info',
      component: () => import('../page/info.vue'),
      meta: {
        title: '个人信息管理'
      }
    }
    ]
  },
  {
    path: '/login',
    component: () => import('../page/Login.vue')
  }
    // {
    //   path: '/error',
    //   component: () => import('../components/page/Error.vue')
    // },
    // {
    //   path: '/404',
    //   component: () => import('../components/page/404.vue')
    // }
  ]
})
