class NotesImageUploadAdapter {
    constructor(loader, url) {
        this.loader = loader;
        this.url = url;
    }

    upload() {
        return new Promise((resolve, reject) => {
            console.log(this.loader);
            resolve.apply({ succes: true })
        });
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }
}

function NotesCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new NotesImageUploadAdapter(loader, 'http://example.com/image/upload/path');
    };
}