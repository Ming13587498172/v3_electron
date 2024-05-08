import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'

/** 获取views下所有.vue文件 */
// let modules = import.meta.glob('./../../views/**/*.vue')
// let modules = import.meta.glob('/src/views/**/*.vue')
let modules = import.meta.glob('../../../views/**/*.vue')

export const useRoutesStore = defineStore('routes', {
  state() {
    return {
      routesList: [] as Array<RouteRecordRaw>
    }
  },
  actions: {
    addRourtes(data: Array<any>, router: any) {
      data.forEach(m => {
        /** 动态路由对象 */ 
        let routeData = {
          path: m.path,
          name: m.name,
          // 错误示例：components: () => import(`../views/Pages/${m.component}`)
          // 正确示例如下：
          // component: modules[`@/views/${m.component}/index.vue`],
          // component: modules[m.component],
          component: () => import(`../../../views/${m.component}/index.vue`),
          meta: m.meta,
          children: []
        }
        this.routesList.push(routeData)
        this.routesList = this.routesList.reduce((result, obj) => {
          if (!result.some(item => JSON.stringify(item) === JSON.stringify(obj))) {
            result.push(obj)
          }
          return result
        }, [])
        // this.routesList.forEach(m => router.addRoute('Layout', m))
        /** 添加动态路由 */
        router.addRoute('Layout', routeData)
      })
      // this.routesList.forEach(m => router.addRoute(m))
    }
  },
  getters: {},
  persist: true
})
