import { getAllNotes } from '../backend/database/connector/note';
import { getAllActions } from '../backend/database/connector/action';

const defaultWorkspace = 'default';

const getNotes = () => {
    return getAllNotes();
}

const getActions = () => {
    return getAllActions();
}

const addNote = (workspace, note) => {

}

export {
    getNotes,
    getActions
}