const Datastore = require('nedb');

const action = new Datastore({ filename: './src/backend/database/action.json', autoload: true });

const defaultErrorResponse = {
    errorMessage: 'Invalid Data',
    code: 401,
    error: true
}

const findAllActions = () => {
    return new Promise((resolve, reject) => {
        action.find({}, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const findActionById = (id) => {
    return new Promise((resolve, reject) => {
        action.find({ _id: id }, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}

const saveAction = (data) => {
    if (data._id) {
        return _updateAction(data._id, data);
    }
    return _insertAction(data);
}

const _insertAction = (data) => {
    return new Promise((resolve, reject) => {
        if (!data || !data.key || !data.action) {
            reject(defaultErrorResponse);
            return;
        }
        data.createdDate = new Date();
        action.insert(data, (err, value) => {
            (err) ? reject(err): resolve(value);
        })
    });
}
const _updateAction = (id, data) => {
    return new Promise((resolve, reject) => {
        if (!data || !data.key || !data.action) {
            reject(defaultErrorResponse);
            return;
        }
        action.update({ _id: id }, data, {}, function(err, numReplaced) {
            (err) ? reject(err): resolve({ numReplaced: numReplaced });
        });
    });
}

const deleteAction = (id) => {
    return new Promise((resolve, reject) => {
        action.remove({ _id: id }, (err, numRemoved) => {
            (err) ? reject(err): resolve({ numRemoved: numRemoved });
        })
    });
}

module.exports = {
    findAllActions,
    findActionById,
    saveAction,
    deleteAction
}