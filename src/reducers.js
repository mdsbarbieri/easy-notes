import ACTIONS from './actionTypes';

let initialState = {
    currentFilter: '',
    storagedNotes: [],
    selectedNote: {
        idx: 0,
        note: {}
    },
    renderedNotesQty: 0,
    selectedNoteIdx: 0,
    storagedActions: [],
    showLoading: true,
    errorMessage: '',
    storageNeedUpdate: true
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CURRENT_FILTER:
            return {
                ...state,
                currentFilter: action.payload
            }
        case ACTIONS.STORAGED_NOTES:
            return {
                ...state,
                storagedNotes: action.payload
            }
        case ACTIONS.SELECTED_NOTE:
            return {
                ...state,
                selectedNote: action.payload
            }
        case ACTIONS.SELECTED_NOTE_INDEX:
            return {
                ...state,
                selectedNoteIdx: action.payload
            }
        case ACTIONS.RENDERED_NOTES_QTY:
            return {
                ...state,
                renderedNotesQty: action.payload
            }
        case ACTIONS.STORAGED_ACTIONS:
            return {
                ...state,
                storagedActions: action.payload
            }
        case ACTIONS.SET_TYPED_ACTION:
            return {
                ...state,
                typedAction: action.payload
            }
        case ACTIONS.SHOW_LOADING:
            return {
                ...state,
                showLoading: action.payload
            }
        case ACTIONS.ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload
            }
        case ACTIONS.STORAGE_NEED_UPDATE:
            return {
                ...state,
                storageNeedUpdate: action.payload
            }
        default:
            return state
    }
}

export default reducers