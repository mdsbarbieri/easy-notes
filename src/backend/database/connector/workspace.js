const Datastore = require('nedb');
const os = require('os');

let dataFolder = os.homedir() + '/easy-notes/data';
const workspace = new Datastore({ filename: `${dataFolder}/workspace.json`, autoload: true });

const defaultErrorResponse = {
    errorMessage: 'Invalid Data',
    code: 401,
    error: true
}

const findAllWorkspace = () => {
    return new Promise((resolve, reject) => {
        workspace.find({}, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const findWorkspaceById = (id) => {
    return new Promise((resolve, reject) => {
        workspace.find({ _id: id }, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const insertWorkspace = (data) => {
    return new Promise((resolve, reject) => {
        if (!data || !data.user || !data.owner) {
            reject(defaultErrorResponse);
            return;
        }
        data.createdDate = new Date();
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
    findAllWorkspace,
    findWorkspaceById,
    insertWorkspace,
    updateWorkspace,
    removeWorkspace
}