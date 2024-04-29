import { app, BrowserWindow } from 'electron'

let win: BrowserWindow | null

// 创建窗口
const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    // frame:false, // 无边框且禁止拖动
    // transparent: true, // 窗口是否透明 ----- 当打开开发者工具时，窗口将不透明
    // autoHideMenuBar: true,  //  窗口菜单栏是否隐藏 ----- 用户单击 Alt 键时显示
    resizable: false, // 是否禁止窗口拉伸
    show: false, // 窗口创建完是否立刻显示
    icon: './src/assets/vue.svg', //  设置窗口图标
    // title: 'First-Electron', // 设置窗口标题 ----- 如果html里边设置了title标签 或 package.json里设置了name，electron窗口设置的title就会被覆盖掉。
    webPreferences: {
      contextIsolation: false, // 防木马注入
      webSecurity: false,  // 跨域问题
      nodeIntegration: true, // 解决require is not defined问题
      webviewTag: true, // 解决webview无法显示问题
    },
  })

  if (process.env.NODE_ENV != 'development') {  //生产环境下 加载
    win.loadFile('./dist/index.html')
  } else {  //调试环境下 加载本地运行的http路径,VITE_DEV_SERVER_HOST 如果是undefined 换成  VITE_DEV_SERVER_HOSTNAME
    /**
     * webContents.openDevTools -> 打开开发者工具
     * 默认状态，开发者工具的位置是上一次工具打开的位置
     * win.webContents.openDevTools()
     * 指定打开的位置状态 {mode:'xxxx'} left、right、bottom、detach
    */
    win.webContents.openDevTools({ mode: 'detach' })
    win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`).then(() => {})
  }

  
  // 在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 ready-to-show 事件
  win.on('ready-to-show', () => {
    win?.show()
  })
}

app.whenReady().then(() => {
  createWindow()
})