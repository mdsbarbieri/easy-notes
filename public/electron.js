//https://getstream.io/blog/takeaways-on-building-a-react-based-app-with-electron/
const { app, BrowserWindow, shell, ipcMain, globalShortcut } = require('electron');
const ipcDataConnector = require('../src/backend/services/ipcDataConnector');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

createWindow = () => {
    mainWindow = new BrowserWindow({
        backgroundColor: '#F7F7F7',
        show: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js',
        },
        // width: 650,
        // height: 350,
        width: 800,
        height: 600,
        frame: false,
        resizable: false,
        show: false
    });

    mainWindow.loadURL(isDev ? 'http://localhost:3001' : `file://${path.join(__dirname, '../build/index.html')}`);

    declareShortCuts();

    if (isDev) {
        mainWindow.webContents.openDevTools()
        installExtensions();
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        ipcMain.on('open-external-window', (event, arg) => {
            shell.openExternal(arg);
        });
    });
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
    globalShortcut.register("CommandOrControl+Shift+Alt+Space", () => toggleWindow(mainWindow));
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

ipcDataConnector.declareMessageListener();