import ACTIONS from '../actionTypes';

const setShowLoading = (showLoading) => ({
    type: ACTIONS.SHOW_LOADING,
    payload: showLoading
})

const setErrorMessage = (errorMessage) => ({
    type: ACTIONS.ERROR_MESSAGE,
    payload: errorMessage
})

export {
    setShowLoading,
    setErrorMessage
}