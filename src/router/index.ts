import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/layout.vue'
import About from '@/views/about/about.vue'
import Applications from '@/views/applications/applications.vue'
import Setting from '@/views/setting/setting.vue'
import Servers from '@/views/servers/servers.vue'
import Download from '@/views/download/download.vue'

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/applications',
      children: [
        // {
        //   path: '/xshell',
        //   component: Xshell,
        // },
        {
          path: '/about',
          component: About,
          meta: {
            keepAlive: true,
          },
        },
        {
          path: '/applications',
          component: Applications, // () => import("@/views/test/test.vue"),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: '/setting',
          component: Setting, // () => import("@/views/test/test.vue"),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: '/servers',
          component: Servers, // () => import("@/views/test/test.vue"),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: '/download',
          component: Download, // () => import("@/views/test/test.vue"),
          meta: {
            keepAlive: true,
          },
        },
      ],
    },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   console.log(`savedPosition: `, savedPosition)
  // },
})

export default router
