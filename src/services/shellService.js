import ipcMessages from '../backend/ipcMessagesEsm';
const { ipcRenderer } = window.require('electron');

const executeAction = (action, params) => {
    if (!action) {
        return;
    }
    let actionValue = action.action;
    if (actionValue.includes('$')) {
        let renderedAction = _mountParams(actionValue, params);
        actionValue = renderedAction;
    }

    if (!actionValue) {
        return;
    }

    ipcRenderer.send(ipcMessages.EXECUTE_ACTION, actionValue);
}

const _mountParams = (actionValue, params) => {
    if (!params.length) {
        return;
    }

    params.forEach((element, idx) => {
        actionValue = actionValue.replace(`$${idx + 1}`, element);
    });

    if (actionValue.includes('$')) {
        console.log('Invalid Paramns lenght')
        return;
    }

    return actionValue
}

export {
    executeAction
}