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
    return new Promise((resolve, reject) => {
        ipcRenderer.send(ipcMessages.GET_ALL_ACTIONS);
        ipcRenderer.on(ipcMessages.GET_ALL_ACTIONS_REPLY, (event, result) => {
            if (result && result.error) {
                reject(result);
                return;
            }
            resolve(result);
        })
    })
}

const saveNote = (note, workspace) => {
    workspace = workspace || defaultWorkspace;
    note.workspace = workspace;
    return new Promise((resolve, reject) => {
        ipcRenderer.send(ipcMessages.SAVE_NOTE, note);
        ipcRenderer.on(ipcMessages.SAVE_NOTE_REPLY, (event, result) => {
            if (result && result.error) {
                reject(result);
                return;
            }
            resolve(result);
            return;
        })
    })
}

const saveAction = (action) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(ipcMessages.SAVE_ACTION, action);
        ipcRenderer.on(ipcMessages.SAVE_ACTION_REPLY, (event, result) => {
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

const removeAction = (id) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(ipcMessages.REMOVE_ACTION, id);
        ipcRenderer.on(ipcMessages.REMOVE_ACTION_REPLY, (event, result) => {
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
    saveNote,
    removeNote,
    saveAction,
    removeAction
}