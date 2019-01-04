import { findAllActions } from '../backend/database/connector/action';
import ipcMessages from '../backend/ipcMessagesEsm';

const { ipcRenderer } = window.require('electron');
const defaultWorkspace = 'default';

const getAllNotes = () => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(ipcMessages.GET_ALL_NOTES);
        ipcRenderer.on(ipcMessages.GET_ALL_NOTES_REPLY, (event, result) => {
            if (result && result.error) {
                reject(result);
                return;
            }
            resolve(result);
        })
    })
}

const getAllActions = () => {
    return findAllActions();
}

const addNote = (note, workspace) => {
    workspace = workspace || defaultWorkspace;
    note.workspace = workspace;
    return new Promise((resolve, reject) => {
        ipcRenderer.send(ipcMessages.ADD_NOTE, note);
        ipcRenderer.on(ipcMessages.ADD_NOTE_REPLY, (event, result) => {
            if (result && result.error) {
                reject(result);
                return;
            }
            resolve(result);
            return;
        })
    })
}

const removeNote = (id) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(ipcMessages.REMOVE_NOTE, id);
        ipcRenderer.on(ipcMessages.REMOVE_NOTE_REPLY, (event, result) => {
            if (result && result.error) {
                reject(result);
                return;
            }
            resolve(result);
            return;
        })
    })
}

export {
    getAllNotes,
    getAllActions,
    addNote,
    removeNote
}