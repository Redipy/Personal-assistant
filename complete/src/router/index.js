import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
          name: 'index',
          component: () => import('../page/Home.vue'),
          meta: {
            title: '系统首页'
          }
        },
        {
          path: '/date',
          name: 'date',
          component: () => import('../page/date.vue'),
          meta: {
            title: '日历'
          }
        },
        {
          path: '/task',
          name: 'task',
          component: () => import('../page/task.vue'),
          meta: {
            title: '我的任务'
          }
        },
        {
          path: '/noforget',
          name: 'noforget',
          component: () => import('../page/noforget.vue'),
          meta: {
            title: '我的备忘录'
          }
        },
        {
          path: '/message',
          name: 'message',
          component: () => import('../page/message.vue'),
          meta: {
            title: '我的信息'
          }
        },
        {
          path: '/group',
          name: 'group',
          component: () => import('../page/group.vue'),
          meta: {
            title: '群组管理'
          }
        },
        {
          path: '/info',
          name: 'info',
          component: () => import('../page/info.vue'),
          meta: {
            title: '个人信息管理'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
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

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login') {
//     if (sessionStorage.getItem('EX_token')) {
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
