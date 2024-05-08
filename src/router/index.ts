import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router"

import { getRoutesAPI } from "@/api/routes"
import { useRoutesStore } from '@/store'

import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/Home/index.vue'),
        name: 'Index',
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/error/404.vue'),
    name: '404',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.path === '/login') {
    next()
  } else {
    // 页面刷新时，重新加载路由
    const store = useRoutesStore()
    if (store.routesList.length === 0) {
      try {
        const { data } = await getRoutesAPI()
        store.addRourtes(data, router)
        // data.forEach((v: RouteRecordRaw) => router.addRoute('Layout', v))
        next({ path: to.path, replace: true })
      } catch (err) {
        next()
      }
    } else {
      next()
    }
  }
})


export default router
