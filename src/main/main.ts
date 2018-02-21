import { app, BrowserWindow } from "electron";
import * as path from "path";
import { format } from "url";
import { isDev } from 'electron-is-dev';
import { resolve } from 'app-root-path';

app.on('ready', async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: !isDev
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  const devPath = 'http://localhost:1124';
  const prodPath = format({
    pathname: resolve('dist/index.html'),
    protocol: 'file:',
    slashes: true
  });
  const url = isDev ? devPath : prodPath;

  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
});

app.on('window-all-closed', () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
