const {app, BrowserWindow} = require('electron');
const path=require('path')
// eslint-disable-next-line no-unused-vars
let mainWindow;
const isDev = require('electron-is-dev');
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webpreferences: {
            devTools:true,
            javascript: true,
            plugins: true,
            nodeIntegration: true, // 不集成 Nodejs
            webSecurity: false,
            preload: path.join(__dirname, './public/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
        }
    });
    // const urlLocation = isDev ? 'http://localhost:3000' : 'dummyUrl';
    const urlLocation = isDev ? './index.html' : 'dummyUrl';
    mainWindow.loadURL(urlLocation)
});