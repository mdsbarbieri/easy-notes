import ACTIONS from '../actionTypes';

const setStoragedActions = (actions) => ({
    type: ACTIONS.STORAGED_ACTIONS,
    payload: actions
})

export {
    setStoragedActions
}