const path = require('path');
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    resizable: true,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.maximize();

  // Cargar HTML
  win.loadFile('./index.html');

  // Usar la consola
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});