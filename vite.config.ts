import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import {fileURLToPath, URL} from 'node:url'
import electron from 'vite-plugin-electron'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: 'electron/main.ts',
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
  ],
  base: './',
  resolve: {
    alias: {
      // '@': resolve(__dirname, './src')
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "localhost",
    hmr: true,
    proxy: {
      '/api': {
        target: '',
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
        additionalData: '@import "@/assets/styles/index.scss";'
      }
    }
  }

})
