import { defineStore } from 'pinia'
import { ref } from 'vue'

type DynamicItem = {
  /** id */
  id: number,
  /** 标题 */
  title: string,
  /** 元信息 */
  meta: DynamicMetaItem
}
type DynamicMetaItem = {
  /** 是否需要用户权限 */
  requireAuth: boolean,
  /** 受访问限制的角色 */
  roles: string[]
}

export const useDynamicStore = defineStore('dynamic', () => {
  let dynamicList = ref<DynamicItem[]>([])

  const dealDynamicList = (user: string, payload: DynamicItem[]) => {
    dynamicList.value = payload.filter(item => item.meta.requireAuth === false || item.meta.requireAuth === true && item.meta.roles.includes(user))
  }

  return {
    dynamicList,
    dealDynamicList
  }
}, {
  persist: true,
})
