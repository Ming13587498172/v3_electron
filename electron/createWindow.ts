import { BrowserWindow, ipcMain, IpcMainEvent } from "electron"
import path from "node:path"

/** 窗口配置 */
interface IWindowsCfg {
  /** 唯一 id */
  id?: number | null
  /** 设置窗口标题 ----- 如果html里边设置了title标签 或 package.json里设置了name，electron窗口设置的title就会被覆盖掉。 */
  title?: string
  /** 宽度 */
  width?: number
  /** 高度 */
  height?: number
  /** 窗口创建完是否立刻显示 */
  show?: boolean
  /** 设置窗口图标 路径 */
  icon?: string
  /** 无边框且禁止拖动 */
  frame?:false
  /** 窗口是否透明 ----- 当打开开发者工具时，窗口将不透明 */
  transparent?: true
  /** 窗口菜单栏是否隐藏 ----- 用户单击 Alt 键时显示 */
  autoHideMenuBar?: true
  /** 最小宽度 */
  minWidth?: number
  /** 最小高度 */
  minHeight?: number
  /** 页面路由 URL '/manage?id=123' */
  route?: string
  /** 传递参数，新窗口打开时能直接从路由中获取，拼接url传递，推荐只传小数据 */
  param?: string
  /** 是否支持调整窗口大小 */
  resizable?: boolean
  /** 是否最大化 */
  maximize?: boolean
  /** 窗口背景色 */
  backgroundColor?: string
  /** 数据 */
  data?: object | null
  /** 是否支持多开窗口 (如果为 false，当窗体存在，再次创建不会新建一个窗体 只 focus 显示即可，，如果为 true，即使窗体存在，也可以新建一个) */
  isMultiWindow?: boolean
  /** 是否主窗口(当为 true 时会替代当前主窗口) */
  isMainWin?: boolean
  /** 父窗口  创建父子窗口 -- 子窗口永远显示在父窗口顶部 【父窗口可以操作】 */
  parent?: BrowserWindow,
  /** 父窗口 id  创建父子窗口 -- 子窗口永远显示在父窗口顶部 【父窗口可以操作】 */
  parentId?: number | null,
  /** 模态窗口 -- 模态窗口是禁用父窗口的子窗口，创建模态窗口必须设置 parent 和 modal 选项 【父窗口不能操作】 */
  modal?: boolean
  /** 配置 */
  webPreferences: webPreferencesItem
}
/** 窗口webPreferences属性的配置 */
interface webPreferencesItem {
  /** 依赖文件 路径 */
  preload?: any,
  /** 防木马注入 */
  contextIsolation?: boolean,
  /** 跨域问题 */
  webSecurity?: boolean,
  /** 解决require is not defined问题 */
  nodeIntegration?: boolean,
  /** 解决webview无法显示问题 */
  webviewTag?: boolean,
  /** 沙盒 */
  sandbox?: boolean,
  /** 解决跨域问题 */
  allowRunningInsecureContent?: boolean,
  /** 解决跨域问题 */
  experimentalFeaturesEnabled?: boolean,
}
/** 窗口组 */
interface IGroup {
  [props: string]: {
    route: string | undefined
  }
}

/** 窗口 */
let win: BrowserWindow  | null
/** 当前窗口 */
let main: BrowserWindow | null
/** 窗口组 */
let group: IGroup
group = {}
/** 窗口 公共属性/初始值 */
let publicConfig: IWindowsCfg = {
  resizable: false, // 是否禁止窗口拉伸
  show: false, // 窗口创建完是否立刻显示
  icon: path.join(process.cwd(), '/src/assets/hzw.jpg'), //  设置窗口图标
  webPreferences: {
    contextIsolation: false, // 防木马注入
    webSecurity: false,  // 跨域问题
    nodeIntegration: true, // 解决require is not defined问题
    webviewTag: true, // 解决webview无法显示问题
    allowRunningInsecureContent: true, // 跨域问题
    experimentalFeaturesEnabled: true, // 跨域问题
  }
}

// 创建窗口方法
export const createWindows = (windowConfig: IWindowsCfg, isMainWin?: boolean): BrowserWindow => {
  // 将公共的属性和传过来的属性合并成一个完整的窗口属性
  windowConfig = {...windowConfig, ...publicConfig}
  // 根据窗口属性在窗口组中查询是否存在，若已存在则打开窗口
  for (let i in group) {
    if (getWindow(Number(i)) && group[i].route === windowConfig.route) {
      console.log("窗口已经存在了")
      getWindow(Number(i)).show()
      getWindow(Number(i)).focus()
      return win!
    }
  }

  // 判断是否有父级窗口
  if (windowConfig.parentId) {
    console.log("parentId：" + windowConfig.parentId)
    windowConfig.parent = getWindow(windowConfig.parentId) as BrowserWindow // 获取主窗口
  } else if (main) {
    console.log('当前为主窗口')
  } // 还可以继续做其它判断

  // 创建窗口对象
  win = new BrowserWindow(windowConfig)
  win.maximizable = true

  // 在窗口组中存储当前窗口的id及路由
  console.log("窗口 id：" + win.id)
  group[win.id] = {
    route: windowConfig.route,
  }
  console.log("🚀 ~ createWindows ~ group:", group)

  // // 根据当前环境加载页面，并传递参数
  // const param = windowConfig.param
  //   ? "?urlParamData=" + windowConfig.param
  //   : ""

  // 是否主窗口
  if (isMainWin) {
    if (main) {
      delete group[main.id]
      main.close()
    }
    main = win
  }
  windowConfig.id = win.id
  
  // 设置打开窗口的路径
  if (process.env.NODE_ENV != 'development') {  //生产环境下 加载
    /** 如果是线上环境，则加载html文件的路径，然后拼接路由 */
    // win.loadFile('./dist/index.html', { hash: windowConfig.route + param })
    win.loadFile('./dist/index.html', { hash: windowConfig.route })
    // win.loadFile('./dist/index.html')
  } else { //调试环境下 加载本地运行的http路径,VITE_DEV_SERVER_HOST 如果是undefined 换成  VITE_DEV_SERVER_HOSTNAME
    win.webContents.openDevTools()
    /** 如果是开发环境，则直接访问本地跑起的服务，拼接对应的路由 */
    // win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}#${windowConfig.route}${param}`).then(() => {}) // hash路由模式的路径及传参拼接
    // win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}${windowConfig.route}`).then(() => {}) // hash路由模式的路径拼接
    win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}${windowConfig.route?.slice(1)}`).then(() => {})  // history路由模式的路ing拼接
  }

  // 发送 判断条件，是否处在 electron 环境下
  win.webContents.send('isElectron', process && process.versions && process.versions['electron'])

  // 在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 ready-to-show 事件
  win.on('ready-to-show', () => {
    win?.show()
  })

  // 监听窗口关闭事件
  win.on('close', (e) => {
    // 根据窗口id，删除窗口组中的对应窗口
    delete group[win!.id]
  })

  // 绑定通用窗口事件
  return win
}

export const listen = () => {
  let timer: NodeJS.Timeout
  /** 传递 echarts的option数据 */
  ipcMain.on('get-charts-options', (event, arg) => {
    if (arg === 'clear') {
      // timer._onTimeout -> 可通过 _onTimeout 属性的值是否为 null，来判断 setTimeout 是否被清除
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        win!.webContents.send('set-charts-options', arg)
      }, 500)
    }
  })
  /** 创建新窗口 */
  ipcMain.on('open-new-window', (event, arg) => {
    createWindows(arg)
  })
}

// 获取窗口
const getWindow = (id: number): any => {
  return BrowserWindow.fromId(id)
}
