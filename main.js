const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {Menu} = electron;
const {Tray} = electron;
const path = require('path');

let tray = null;
let mainWindow = null;

const menuTemplate = [{
    'label': 'Show/Hide',
    'click': (ev) => {toggleWindow();}
}, {
    'label': 'Quit',
    'click': (ev) => {app.exit(0);}
}];
const resourcesDirectory = path.join(__dirname, 'resources');
const createTray = () => {
    const menu = Menu.buildFromTemplate(menuTemplate);
    tray = new Tray(path.join(resourcesDirectory, 'icons', 'messenger.png'));
    tray.on('right-click', (ev) => {
        menu.popup();
    });
    tray.setToolTip('wechat app');
    tray.setContextMenu(menu);
};

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1010,
        height: 740,
        show: false,
    });
    mainWindow.loadURL('https://wx.qq.com');
    mainWindow.setMenu(null);
    mainWindow.on('close', (ev) => {
        mainWindow.hide();
        ev.preventDefault();
    });
    mainWindow.once('ready-to-show', (ev) => {
        mainWindow.show();
    });
};

const toggleWindow = (ev) => {
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        mainWindow.show();
        mainWindow.focus();
    }
};

app.on('ready', (ev) => {
    createTray();
    createMainWindow();
});

app.on('window-all-closed', (ev) => {
    app.quit();
});
