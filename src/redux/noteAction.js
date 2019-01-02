import ACTIONS from '../actionTypes';

const setStoragedNotes = (notesList) => ({
    type: ACTIONS.STORAGED_NOTES,
    payload: notesList
})

const setSelectedNote = (note) => ({
    type: ACTIONS.SELECTED_NOTE,
    payload: note
})

const setRenderedNotesQty = (qty) => ({
    type: ACTIONS.RENDERED_NOTES_QTY,
    payload: qty
})

const setSelectedNoteIdx = (qty) => ({
    type: ACTIONS.SELECTED_NOTE_INDEX,
    payload: qty
})

const setTypedAction = (qty) => ({
    type: ACTIONS.SET_TYPED_ACTION,
    payload: qty
})

export {
    setStoragedNotes,
    setSelectedNote,
    setRenderedNotesQty,
    setSelectedNoteIdx,
    setTypedAction
}