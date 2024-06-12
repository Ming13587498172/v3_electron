import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import electron from 'vite-plugin-electron'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// import renderer from "vite-plugin-electron-renderer"
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
// 引入pxtorem插件
import postCssPxToRem from "postcss-pxtorem"
// mock
import { viteMockServe } from 'vite-plugin-mock'
// 视图分析
// 开启Gzip
import viteCompression from "vite-plugin-compression"
// 引入jsx插件 jsx/tsx
import vueJsx from '@vitejs/plugin-vue-jsx'

/** 获取本机IP地址 */
import os from 'node:os'
const getNetworkIp = () => {
	let needHost = '' // 打开的host
	try {
		// 获得网络接口列表
		let network = os.networkInterfaces()
		for (let dev in network) {
			let iface = network[dev]
			for (let i = 0; i < iface!.length; i++) {
				let alias = iface![i]
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					needHost = alias.address
				}
			}
		}
	} catch (e) {
		needHost = '127.0.0.1'
	}
	return needHost
}

// https://vitejs.dev/config/
export default defineConfig(({mode, command}) => {
  // 获取.env文件里定义的环境变量
  const env = loadEnv(mode, process.cwd())
  env.VITE_GET_IP = `http://${getNetworkIp()}:80`
  return {
    define: {
      'process.env': {
        'VITE_GET_IP': `http://${getNetworkIp()}:80`
      },
    },
    plugins: [
      vue(),
      vueSetupExtend(),
      // 注册jsx
      vueJsx(),
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
      /** 打包优化 Start */
      // // 打包视图分析
      // visualizer({
      //   open: true, //在默认用户代理中打开生成的文件
      //   gzipSize: true, // 收集 gzip 大小并将其显示
      //   brotliSize: true, // 收集 brotli 大小并将其显示
      //   filename: "stats.html", // 分析图生成的文件名
      // }),
      /** 
       * 压缩 -> 缩小打包体积
       * @ filter:过滤器，对哪些类型的文件进行压缩, 默认为 /.(js|mjs|json|css|html)$/i
       * @ verbose:true; 是否在控制台输出压缩结果，默认为true
       * @ threshold: 启用压缩的文件大小限制，单位是字节，默认为0
       * @ disable:false; 是否禁用压缩，默认为false
       * @ deleteOriginFile: 压缩后是否删除原文件，默认为false
       * @ algorithm: 采用的压缩算法,默认是gzip
       * @ ext：生成的压缩包后缀
       */
      viteCompression({
        filter: /\.(js|css|json|html|ico|svg)(\?.*)?$/i, // 匹配要压缩的文件的正则表达式，默认为匹配.js、.css、.json、.html、.ico和.svg文件
        compressionOptions: { level: 9 }, // 指定gzip压缩级别，默认为9（最高级别）
        verbose: true,    
        disable: false,
        threshold: 10240,  
        algorithm: 'gzip',
        ext: '.gz',
      }),
      /** End */
    ],
    base: './',
    resolve: {
      // 确保导入组件时可以识别 `.tsx` 文件
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        // '@': resolve(__dirname, './src')
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    server: {
      host: "localhost",
      hmr: true,
      proxy: {
        // '/api': {
        //   // target: '',
        //   // target: 'http://127.0.0.1:5173',
        //   target: `http://${getNetworkIp()}:5173`,
        //   changeOrigin: true,
        //   rewrite: path=>path.replace(/^\/api/, '')
        // },
        [env.VITE_APP_BASE_API]: {
          // target: '',
          // target: 'http://127.0.0.1:5173',
          target: `http://${getNetworkIp()}:5173`,
          changeOrigin: true,
          rewrite: path => path.replace(RegExp(`^${env.VITE_APP_BASE_API}`), '')
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
  }
})
