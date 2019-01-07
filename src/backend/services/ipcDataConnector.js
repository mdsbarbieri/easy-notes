const { ipcMain } = require('electron')
const { saveNote, findAllNotes, deleteNote } = require('../database/connector/note');
const { saveAction, findAllActions, deleteAction } = require('../database/connector/action');
const { executeShell } = require('./shellService');
const ipcMessages = require('../ipcMessages');
const _ = require('lodash');

const _declareNoteListener = () => {
    ipcMain.on(ipcMessages.REMOVE_NOTE, (event, param) => {
        deleteNote(param).then(result => {
            event.sender.send(ipcMessages.REMOVE_NOTE_REPLY, result);
        }).catch(err => {
            event.sender.send(ipcMessages.REMOVE_NOTE_REPLY, err);
        })
    });

    ipcMain.on(ipcMessages.SAVE_NOTE, (event, param) => {
        saveNote(param).then(result => {
            event.sender.send(ipcMessages.SAVE_NOTE_REPLY, result);
        }).catch(err => {
            event.sender.send(ipcMessages.SAVE_NOTE_REPLY, err);
        })
    });

    ipcMain.on(ipcMessages.GET_ALL_NOTES, (event) => {
        findAllNotes().then(result => {
            event.sender.send(ipcMessages.GET_ALL_NOTES_REPLY, result);
        }).catch(err => {
            event.sender.send(ipcMessages.GET_ALL_NOTES_REPLY, err);
        })
    });
}

const _declareActionListener = () => {
    ipcMain.on(ipcMessages.REMOVE_ACTION, (event, param) => {
        deleteAction(param).then(result => {
            event.sender.send(ipcMessages.REMOVE_ACTION_REPLY, result);
        }).catch(err => {
            event.sender.send(ipcMessages.REMOVE_ACTION_REPLY, err);
        })
    });

    ipcMain.on(ipcMessages.SAVE_ACTION, (event, param) => {
        saveAction(param).then(result => {
            event.sender.send(ipcMessages.SAVE_ACTION_REPLY, result);
        }).catch(err => {
            event.sender.send(ipcMessages.SAVE_ACTION_REPLY, err);
        })
    });

    ipcMain.on(ipcMessages.GET_ALL_ACTIONS, (event) => {
        findAllActions().then(result => {
            event.sender.send(ipcMessages.GET_ALL_ACTIONS_REPLY, result);
        }).catch(err => {
            event.sender.send(ipcMessages.GET_ALL_ACTIONS_REPLY, err);
        })
    });

    ipcMain.on(ipcMessages.EXECUTE_ACTION, (event, execute) => {
        executeShell(execute);
    });
}

const declareDataListener = () => {
    _declareNoteListener();
    _declareActionListener();
}

const declareToogleListener = (mainWindow, execute) => {
    ipcMain.on(ipcMessages.TOOGLE_WINDOW, () => {
        execute(mainWindow);
    });
}

const declareResizeListener = (mainWindow) => {
    ipcMain.on(ipcMessages.RESIZE_WINDOW, (event, size) => {
        const position = mainWindow.getPosition();
        const currentSize = mainWindow.getSize();
        if (_.isEqual(size.height, currentSize[1])) {
            return;
        }
        mainWindow.setSize(size.width, size.height);
        if (size.full) {
            mainWindow.setPosition(position[0], position[1] - 155);
            return;
        }
        mainWindow.setPosition(position[0], position[1] + 155);
    });
}

module.exports = {
    declareDataListener,
    declareToogleListener,
    declareResizeListener
}