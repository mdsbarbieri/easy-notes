const executeAction = (action, params) => {
    if (!action) {
        return;
    }
    let actionValue = action.action;
    if (actionValue.includes('$')) {
        let renderedAction = _mountParams(actionValue, params);
        actionValue = renderedAction;
    }
    if (actionValue) {
        console.log(actionValue);
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Error on execute operation')
        }, 2000)
    });
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