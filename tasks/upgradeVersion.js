var exec = require('child_process').exec;

console.log('Upgrading package version');

execTask("yarn run upgrade-package-version " + process.argv[2], function () {
    execTask("yarn run update-version-env");
})

function execTask(command, callback) {
    exec(command, function (error, stdout, stderr) {

        if (stdout) {
            console.log(stdout);
        }

        if (stderr) {
            console.log(stderr);
        }

        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            if (callback) {
                callback();
            }
        }
    });
}
