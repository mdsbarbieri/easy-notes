import ipcMessages from '../backend/ipcMessagesEsm';
const { ipcRenderer } = window.require('electron');
const { clipboard } = window.require('electron')

const copyToClipboard = (el) => {
    let text = el.innerText;
    text = text.replace(/\n\n/g, '\n')
    clipboard.writeText(text);
    ipcRenderer.send(ipcMessages.TOOGLE_WINDOW);
}

export {
    copyToClipboard
}