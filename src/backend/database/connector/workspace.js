const Datastore = require('nedb');
const workspace = new Datastore({ filename: './src/backend/database/workspace.json', autoload: true });

const defaultErrorResponse = {
    errorMessage: 'Invalid Data',
    code: 401
}

const getAllWorkspace = () => {
    return new Promise((resolve, reject) => {
        workspace.find({}, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const getWorkspaceById = (id) => {
    return new Promise((resolve, reject) => {
        workspace.find({ _id: id }, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const addWorkspace = (data) => {
    return new Promise((resolve, reject) => {
        if (!data || !data.user || !data.owner) {
            reject(defaultErrorResponse);
            return;
        }
        workspace.insert(data, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const updateWorkspace = (id, data) => {
    return new Promise((resolve, reject) => {
        if (!data || !data.user || !data.owner) {
            reject(defaultErrorResponse);
            return;
        }
        workspace.update({ _id: id }, data, {}, function(err, numReplaced) {
            (err) ? reject(err): resolve({ numReplaced: numReplaced });
        });
    });
}

const removeWorkspace = (id) => {
    return new Promise((resolve, reject) => {
        workspace.remove({ _id: id }, (err, numRemoved) => {
            (err) ? reject(err): resolve({ numRemoved: numRemoved });
        })
    });
}

module.exports = {
    getAllWorkspace,
    getWorkspaceById,
    addWorkspace,
    updateWorkspace,
    removeWorkspace
}