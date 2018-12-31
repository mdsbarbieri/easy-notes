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
    storagedActions: []
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
        default:
            return state
    }
}

export default reducers