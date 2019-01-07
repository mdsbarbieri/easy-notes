const { app, BrowserWindow, shell, ipcMain, globalShortcut } = require('electron');
const ipcDataConnector = require('../src/backend/services/ipcDataConnector');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

createWindow = () => {
    const windowConfig = {
        backgroundColor: '#F7F7F7',
        show: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js',
        },
        center: true,
        frame: false,
        resizable: true,
        show: false
    }

    if (!isDev) {
        windowConfig.width = 650;
        windowConfig.height = 40;
        windowConfig.minWidth = 650;
        windowConfig.maxWidth = 650;
        windowConfig.minHeight = 40;
        windowConfig.maxHeight = 350;
    } else {
        windowConfig.width = 650;
        windowConfig.height = 800;
    }

    mainWindow = new BrowserWindow(windowConfig);
    mainWindow.loadURL(isDev ? 'http://localhost:3001' : `file://${path.join(__dirname, '../build/index.html')}`);
    declareShortCuts();

    if (isDev) {
        mainWindow.webContents.openDevTools()
        installExtensions();
    }

    ipcDataConnector.declareToogleListener(mainWindow, toggleWindow);
    ipcDataConnector.declareResizeListener(mainWindow, isDev);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        ipcMain.on('open-external-window', (event, arg) => {
            shell.openExternal(arg);
        });
    });

    mainWindow.on('blur', () => {
        mainWindow.hide();
    })
};

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('load-page', (event, arg) => {
    mainWindow.loadURL(arg);
});

const declareShortCuts = () => {
    globalShortcut.register("CommandOrControl+Shift+Space", () => toggleWindow(mainWindow));
    globalShortcut.register('f5', function() { mainWindow.reload(); });
    globalShortcut.register('CommandOrControl+R', function() { mainWindow.reload(); });
}

const toggleWindow = (mainWindow, hide) => {
    if (mainWindow.isVisible() || hide) {
        mainWindow.hide()
    } else {
        mainWindow.show()
        mainWindow.focus()
    }
}

const installExtensions = () => {
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS).then(name => {
        console.log(`Added Extension: ${name}`);
    }).catch(err => {
        console.log('An error occurred: ', err);
    });

    installExtension(REDUX_DEVTOOLS).then(name => {
        console.log(`Added Extension: ${name}`);
    }).catch(err => {
        console.log('An error occurred: ', err);
    });
}

ipcDataConnector.declareDataListener();