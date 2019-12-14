const {app, BrowserWindow} = require('electron');
// eslint-disable-next-line no-unused-vars
let mainWindow;
const isDev = require('electron-is-dev');
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webpreferences: {
            nodeintegration: true
        }
    });
    const urlLocation = isDev ? 'http://localhost:3000' : 'dummyUrl';
    mainWindow.loadURL(urlLocation)
});