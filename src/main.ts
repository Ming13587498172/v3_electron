import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/reset.scss'

import router from '@/router/index'
import pinia from '@/store'

const app = createApp(App)

app.use(router)

app.mount('#app')
