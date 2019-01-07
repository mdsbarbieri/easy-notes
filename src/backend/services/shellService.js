const { exec } = require('child_process');

const executeShell = (executeShell) => {
    console.log(`Executing shell => ${executeShell}`);
    exec(executeShell, (err, stdout, stderr) => {
        console.log(`Executing shell => ${executeShell} executed`);
    });
}

module.exports = {
    executeShell
}