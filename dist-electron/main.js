import { app, BrowserWindow } from "electron";
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 1e3,
    height: 800,
    // frame:false, // 无边框且禁止拖动
    // transparent: true, // 窗口是否透明 ----- 当打开开发者工具时，窗口将不透明
    // autoHideMenuBar: true,  //  窗口菜单栏是否隐藏 ----- 用户单击 Alt 键时显示
    resizable: false,
    // 是否禁止窗口拉伸
    show: false,
    // 窗口创建完是否立刻显示
    icon: "./src/assets/vue.svg",
    //  设置窗口图标
    // title: 'First-Electron', // 设置窗口标题 ----- 如果html里边设置了title标签 或 package.json里设置了name，electron窗口设置的title就会被覆盖掉。
    webPreferences: {
      contextIsolation: false,
      // 防木马注入
      webSecurity: false,
      // 跨域问题
      nodeIntegration: true,
      // 解决require is not defined问题
      webviewTag: true
      // 解决webview无法显示问题
    }
  });
  win.maximizable = true;
  if (process.env.NODE_ENV != "development") {
    win.loadFile("./dist/index.html");
  } else {
    win.webContents.openDevTools();
    win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`).then(() => {
    });
  }
  win.on("ready-to-show", () => {
    win == null ? void 0 : win.show();
  });
};
app.whenReady().then(() => {
  createWindow();
});
