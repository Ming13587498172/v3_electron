import { ipcMain, BrowserWindow, app } from "electron";
import path from "node:path";
let win;
let main;
let group;
group = {};
let publicConfig = {
  resizable: false,
  // 是否禁止窗口拉伸
  show: false,
  // 窗口创建完是否立刻显示
  icon: path.join(process.cwd(), "/src/assets/hzw.jpg"),
  //  设置窗口图标
  webPreferences: {
    contextIsolation: false,
    // 防木马注入
    webSecurity: false,
    // 跨域问题
    nodeIntegration: true,
    // 解决require is not defined问题
    webviewTag: true,
    // 解决webview无法显示问题
    allowRunningInsecureContent: true,
    // 跨域问题
    experimentalFeaturesEnabled: true
    // 跨域问题
  }
};
const createWindows = (windowConfig, isMainWin) => {
  var _a;
  windowConfig = { ...windowConfig, ...publicConfig };
  for (let i in group) {
    if (getWindow(Number(i)) && group[i].route === windowConfig.route) {
      console.log("窗口已经存在了");
      getWindow(Number(i)).show();
      getWindow(Number(i)).focus();
      return win;
    }
  }
  if (windowConfig.parentId) {
    console.log("parentId：" + windowConfig.parentId);
    windowConfig.parent = getWindow(windowConfig.parentId);
  } else if (main) {
    console.log("当前为主窗口");
  }
  win = new BrowserWindow(windowConfig);
  win.maximizable = true;
  console.log("窗口 id：" + win.id);
  group[win.id] = {
    route: windowConfig.route
  };
  console.log("🚀 ~ createWindows ~ group:", group);
  if (isMainWin) {
    if (main) {
      delete group[main.id];
      main.close();
    }
    main = win;
  }
  windowConfig.id = win.id;
  if (process.env.NODE_ENV != "development") {
    win.webContents.openDevTools();
    win.loadFile("./dist/index.html", { hash: windowConfig.route });
  } else {
    win.webContents.openDevTools();
    win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}${(_a = windowConfig.route) == null ? void 0 : _a.slice(1)}`).then(() => {
    });
  }
  win.webContents.send("isElectron", process && process.versions && process.versions["electron"]);
  win.on("ready-to-show", () => {
    win == null ? void 0 : win.show();
  });
  win.on("close", (e) => {
    delete group[win.id];
  });
  return win;
};
const listen = () => {
  let timer;
  ipcMain.on("get-charts-options", (event, arg) => {
    if (arg === "clear") {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        win.webContents.send("set-charts-options", arg);
      }, 500);
    }
  });
  ipcMain.on("open-new-window", (event, arg) => {
    createWindows(arg);
  });
};
const getWindow = (id) => {
  return BrowserWindow.fromId(id);
};
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
listen();
let createWindow = () => {
  createWindows({
    width: 1e3,
    height: 800,
    route: "/",
    resizable: false,
    // 是否禁止窗口拉伸
    show: false,
    // 窗口创建完是否立刻显示
    icon: path.join(process.cwd(), "/src/assets/hzw.jpg"),
    //  设置窗口图标
    webPreferences: {
      // preload: path.join(__dirname, 'electron/preload.ts'),
      // preload: path.join(process.cwd(), 'electron/preload.ts'),
      contextIsolation: false,
      // 防木马注入
      webSecurity: false,
      // 跨域问题
      nodeIntegration: true,
      // 解决require is not defined问题
      webviewTag: true,
      // 解决webview无法显示问题
      allowRunningInsecureContent: true,
      // 跨域问题
      experimentalFeaturesEnabled: true
      // 跨域问题
    }
  }, true);
};
app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
