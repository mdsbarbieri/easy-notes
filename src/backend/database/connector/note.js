const Datastore = require('nedb');
const notes = new Datastore({ filename: './src/backend/database/note.json', autoload: true });
const workspaces = new Datastore({ filename: './src/backend/database/workspaces.json', autoload: true });
const config = new Datastore({ filename: './src/backend/database/config.json', autoload: true });

const defaultErrorResponse = {
    errorMessage: 'Invalid Data',
    code: 401
}

const getAllNotes = () => {
    return new Promise((resolve, reject) => {
        notes.find({}, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const getNoteById = (id) => {
    return new Promise((resolve, reject) => {
        notes.find({ _id: id }, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const addNote = (data) => {
    return new Promise((resolve, reject) => {
        if (!data || !data.workspace || !data.type || !data.title || !data.content) {
            reject(defaultErrorResponse);
            return;
        }
        notes.insert(note, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}
const updateNote = (id, data) => {
    return new Promise((resolve, reject) => {
        if (!data || !data.workspace || !data.type || !data.title || !data.content) {
            reject(defaultErrorResponse);
            return;
        }
        notes.update({ _id: id }, data, {}, function(err, numReplaced) {
            (err) ? reject(err): resolve({ numReplaced: numReplaced });
        });
    });
}

const removeNote = (id) => {
    return new Promise((resolve, reject) => {
        notes.remove({ _id: id }, (err, numRemoved) => {
            (err) ? reject(err): resolve({ numRemoved: numRemoved });
        })
    });
}

module.exports = {
    getAllNotes,
    getNoteById,
    addNote,
    updateNote,
    removeNote
}