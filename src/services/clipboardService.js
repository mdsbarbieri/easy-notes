import ipcMessages from '../backend/ipcMessagesEsm';
const { ipcRenderer } = window.require('electron');

const copyToClipboard = (el) => {
    var doc = window.document,
        sel, range;
    if (window.getSelection && doc.createRange) {
        sel = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand('copy');
    if (sel.removeAllRanges) {
        sel.removeAllRanges();
    } else if (sel.empty) {
        sel.empty();
    }
    ipcRenderer.send(ipcMessages.TOOGLE_WINDOW);
}

export {
    copyToClipboard
}