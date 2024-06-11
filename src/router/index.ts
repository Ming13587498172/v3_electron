import { createRouter, createWebHistory, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'

import { getRoutesAPI } from "@/api/routes"
import { useRoutesStore } from '@/store'

/** 静态路由表 */
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
    path: '/index/EchartsGroups',
    component: () => import('@/views/Home/components/EchartsGroups/index.vue'),
    name: 'EchartsGroups',
    meta: { title: 'Echarts图表', hidden: true }
  },
  {
    path: '/index/DataVGroups',
    component: () => import('@/views/Home/components/DataVGroups/index.vue'),
    name: 'DataVGroups',
    meta: { title: 'DataV图表', hidden: true }
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/error/404.vue'),
    name: '404',
  },
]

const router = createRouter({
  /** 判断是否为生产环境，生产 -> createWebHashHistory    开发 -> createWebHistory */
  history: process.env.NODE_ENV !== 'development' ? createWebHashHistory() : createWebHistory(),
  routes
})

/** 路由守卫 */
/** 
 * @ to
 * @ from
 * @ next
 */
router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
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
