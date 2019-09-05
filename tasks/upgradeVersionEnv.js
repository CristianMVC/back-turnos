const path = require('path');
const fs = require('fs');
const appVersion = require('../package.json').version;

console.log('\nRunning versioning tasks');

const versionFilePath = path.join(__dirname + '/../src/environments/version.ts');

const src = `export const version = '${appVersion}';
`;

fs.writeFile(versionFilePath, src, { flat: 'w' }, function (err) {
    if (err) {
        return console.log(err);
    }
    else {
        console.log('Updating application version ' + appVersion);
        console.log('Writing version module to ' + versionFilePath);
    }
});
