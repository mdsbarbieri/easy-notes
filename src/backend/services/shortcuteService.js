const { exec } = require('child_process');
const path = require('path');

function _getCommand(linkPath) {
    const normalizedFile = path.normalize(path.resolve(linkPath))
    const getCOM = `(New-Object -COM WScript.Shell)`
    return `${getCOM}.CreateShortcut('${normalizedFile}').TargetPath;`
}

function getPath(linkPath) {
    return new Promise((resolve, reject) => {
        if (process.platform !== 'win32') {
            return reject(new Error('Platform is not Windows'))
        }
        exec(`powershell.exe -command "${_getCommand(linkPath)}"`, (err, stdout) => {
            if (err) {
                return reject(err)
            }
            const result = stdout.split('\r\n').filter((v) => !!v)
            if (result.length === 1) {
                resolve(result[0])
            }
        })
    })
}

module.exports = {
    getPath
}