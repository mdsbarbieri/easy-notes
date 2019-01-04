const Datastore = require('nedb');
const notes = new Datastore({ filename: './src/backend/database/note.json', autoload: true });

const defaultErrorResponse = {
    errorMessage: 'Invalid Data',
    code: 401,
    error: true
}

const findAllNotes = () => {
    return new Promise((resolve, reject) => {
        notes.find({}, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const findNoteById = (id) => {
    return new Promise((resolve, reject) => {
        notes.find({ _id: id }, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const insertNote = (data) => {
    return new Promise((resolve, reject) => {
        if (!data || !data.workspace || !data.type || !data.title || !data.content) {
            reject(defaultErrorResponse);
            return;
        }
        data.createdDate = new Date();
        notes.insert(data, (err, value) => {
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

const deleteNote = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject(defaultErrorResponse);
            return;
        }
        notes.remove({ _id: id }, (err, numRemoved) => {
            (err) ? reject(err): resolve({ numRemoved: numRemoved });
        })
    });
}

module.exports = {
    findAllNotes,
    findNoteById,
    insertNote,
    updateNote,
    deleteNote
}