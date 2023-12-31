const path = require("path");
const { app, BrowserWindow } = require("electron");

let splash;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    icon: "app.ico",
    show: false, 
    fullscreen: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "lib/js/preload.js"),
    },
  });

  splash = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    transparent: true,
    frame: false,
    roundedCorners: true, 
    webPreferences: {
      nodeIntegration: true, 
    },
  });
  
  splash.loadFile("splash.html");
  win.loadFile("index.html");

  
  win.once("ready-to-show", () => {
    setTimeout(function () {
      splash.destroy();
      win.show();
    }, 2000); 
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
