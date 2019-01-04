import ACTIONS from '../actionTypes';

const setShowLoading = (showLoading) => ({
    type: ACTIONS.SHOW_LOADING,
    payload: showLoading
})

const setErrorMessage = (errorMessage) => ({
    type: ACTIONS.ERROR_MESSAGE,
    payload: errorMessage
})

const setStorageNeedUpdate = (storageNeedUpdate) => ({
    type: ACTIONS.STORAGE_NEED_UPDATE,
    payload: storageNeedUpdate
})

export {
    setShowLoading,
    setErrorMessage,
    setStorageNeedUpdate
}