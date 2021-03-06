const Datastore = require('nedb');
const os = require('os');

let dataFolder = os.homedir() + '/easy-notes/data';
const notes = new Datastore({ filename: `${dataFolder}/note.json`, autoload: true });

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

const saveNote = (data) => {
    if (data._id) {
        return _updateNote(data._id, data);
    }
    return _insertNote(data);
}

const _insertNote = (data) => {
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

const _updateNote = (id, data) => {
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
    saveNote,
    deleteNote
}