import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import {fileURLToPath, URL} from 'node:url'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import electron from 'vite-plugin-electron'
// import renderer from "vite-plugin-electron-renderer"
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// 引入pxtorem插件
import postCssPxToRem from "postcss-pxtorem"
// mock
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    electron([
      {
        entry: 'electron/main.ts',
      },
      // {
      //   entry: 'electron/preload.ts',
      // },
    ]),
    // renderer(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
    // mock服务
    viteMockServe({
      supportTs: true,
      logger: false,
      mockPath: "./src/mock/",
    }),
  ],
  base: './',
  resolve: {
    alias: {
      // '@': resolve(__dirname, './src')
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    host: "localhost",
    hmr: true,
    proxy: {
      '/api': {
        // target: '',
        target: 'http://127.0.0.1:5173',
        changeOrigin: true,
        rewrite: path=>path.replace(/^\/api/, '')
      }
    },
  },
   css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 xxxx.scss 这样就可以在全局中使用 xxxx.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@import "@/styles/index.scss";'
      }
    },
    postcss: {
      plugins: [
        postCssPxToRem({
          // 配置在将px转化为rem时 1rem等于多少px(因为我们搭配使用了amfe-flexible插件 此处我们需要设置的值应是UI设计稿全屏基准宽度的十分之一)
          // 当UI设计稿的全屏基准宽度是1920px时 此处设置的值为192
          rootValue: 192,
          // 当UI设计稿的全屏基准宽度是750px时 此处设置的值为75 但项目中使用了vant组件库 vant的设计稿总宽度是375px 其十分之一应是37.5(需要区分设置)
          // rootValue(res) {
          //   return res.file.indexOf("vant") !== -1 ? 37.5 : 75;
          // },
          // 所有px均转化为rem
          propList: ["*"]
          // 若想设置部分样式不转化 可以在配置项中写出
          // eg: 除 border和font-size外 所有px均转化为rem
          // propList: ["*", "!border","!font-size"],
        })
      ]
    }
  }
})
