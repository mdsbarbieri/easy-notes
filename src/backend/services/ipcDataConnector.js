const { ipcMain } = require('electron')
const { insertNote, findAllNotes, deleteNote } = require('../database/connector/note');
const ipcMessages = require('../ipcMessages');

const _declareNoteListener = () => {

    ipcMain.on(ipcMessages.REMOVE_NOTE, (event, param) => {
        deleteNote(param).then(result => {
            event.sender.send(ipcMessages.REMOVE_NOTE_REPLY, result);
        }).catch(err => {
            event.sender.send(ipcMessages.REMOVE_NOTE_REPLY, err);
        })
    });

    ipcMain.on(ipcMessages.ADD_NOTE, (event, param) => {
        insertNote(param).then(result => {
            event.sender.send(ipcMessages.ADD_NOTE_REPLY, result);
        }).catch(err => {
            event.sender.send(ipcMessages.ADD_NOTE_REPLY, err);
        })
    });

    ipcMain.on(ipcMessages.GET_ALL_NOTES, (event, param) => {
        findAllNotes().then(result => {
            event.sender.send(ipcMessages.GET_ALL_NOTES_REPLY, result);
        }).catch(err => {
            event.sender.send(ipcMessages.GET_ALL_NOTES_REPLY, err);
        })
    });

}

exports.declareMessageListener = () => {
    _declareNoteListener();
}