import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/home/index.vue'),
        name: 'Index',
        meta: { title: '首页' }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
