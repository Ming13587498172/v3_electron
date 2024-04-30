import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index'
import pinia from '@/store'

import '@/styles/reset.scss'
import * as Icons from "@ant-design/icons-vue"

import '@/utils/flexible'

const app = createApp(App)

Object.keys(Icons).forEach((key: any) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(router)
app.use(pinia)

app.mount('#app')
