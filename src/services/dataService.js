import _ from 'lodash';

const notes = [{
        id: '123',
        title: 'Test 1 Title',
        type: 'rich',
        content: '<p>Testando essa <strong>treta</strong></p><ol><li>tasd</li><li>tasdasdas</li></ol><ul><li>asdasd</li><li>asd</li></ul>'
    },
    {
        id: '124',
        type: 'plainText',
        title: 'Test 2 Title',
        content: 'NoteTitle'
    },
    {
        id: '125',
        type: 'code',
        title: 'Test 3 Title',
        content: '.code .note-text-content {\n\tpadding: 12px 12px 0px 16px;\n\tborder: 1px solid #e0e0e0;\n\tmargin-top: 4px;\n}'
    }
];

const actions = [{
    id: '123',
    description: 'Open terminal',
    key: 'openterm',
    action: 'cmd.exe'
}, {
    id: '124',
    description: 'Open browser',
    key: 'obrowser',
    action: 'start $1'
}]

const getAllNotes = () => {
    return Promise.resolve({
        notes: notes
    });
}

const getNoteById = (id) => {
    return Promise.resolve(_.find(notes, { id: id }));
}

const getAllActions = () => {
    return Promise.resolve({
        actions: actions
    });
}

export {
    getAllNotes,
    getNoteById,
    getAllActions
}