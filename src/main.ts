import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index'
import pinia, { useRoutesStore } from '@/store'

import '@/styles/reset.scss'
import * as Icons from "@ant-design/icons-vue"

import '@/utils/flexible'
import { getRoutesAPI } from './api/routes'

const app = createApp(App)

Object.keys(Icons).forEach((key: any) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(pinia)

/** 解决动态路由跳转后刷新空白页/404 (异步操作) */ 
// 1. 将动态路由提前添加好,添加动态路由(在配置路由之前添加)
const { addRourtes } = useRoutesStore()
const getRoutesData = async () => {
  try {
    const { data } = await getRoutesAPI()
    addRourtes(data, router)
  } catch (err) {

  }
}
// 2. 将动态路由提前添加好后，然后再挂载上去，这样才能跳转到目标路由
Promise.all([getRoutesData()]).then(() =>{
  app.use(router)
  app.mount('#app')
})

// app.use(router)
// app.mount('#app')






