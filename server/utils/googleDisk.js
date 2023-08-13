// const { google } = require('googleapis');
// const path = require('path');
// const fs = require('fs');
// const crypto = require('crypto');

const { log } = require('console');

// const auth = new google.auth.GoogleAuth({
//     keyFile: path.resolve(__dirname, '../config') + '/n-r-g-forum-39550b7cc58c.json',
//     scopes: ['https://www.googleapis.com/auth/drive'],
// });

// const drive = google.drive({ version: 'v3', auth: auth });

// /**
//  *
//  * @param {File} file
//  * @returns {Promise<string>}
//  */
// function uploadFile(file) {
//     var requestBody = {
//         name: `${crypto.randomBytes(20).toString('hex')}.png`,
//         fields: 'id'
//     };

//     var media = {
//         mimeType: 'image/png',
//         parents: ['1nKqoWRXqbyPI8jySPWvJ7mkFnumg-aaM'],
//         body: fs.createReadStream(file.path),
//     };

//     return drive.files.create({
//         resource: requestBody,
//         media: media,
//         fields: 'id'
//     }).then(file => {
//         return file.data.id;
//     }).catch(err => console.error(err)); // TODO(developer) - Handle error
// }

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

/**
 * 
 * @param {File} file 
 * @returns {Promise<string>}
 */
function uploadFile(file) {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.resolve(__dirname, '../config') + '/n-r-g-forum-39550b7cc58c.json',
        scopes: 'https://www.googleapis.com/auth/drive',
    });

    const service = google.drive({ version: 'v3', auth });

    const fileMetadata = {
        name: `${crypto.randomBytes(20).toString('hex')}.png`,
        parents: ['1nKqoWRXqbyPI8jySPWvJ7mkFnumg-aaM'],
    };
    const media = {
        mimeType: 'image/png',
        body: fs.createReadStream(file.path),
    };

    return service.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
    }).then(f => {
        return f.data.id;
    }).catch(err => {
        // TODO(developer) - Handle error
        console.error(err)
        throw err;
    });
}
module.exports = {
    uploadFile,
};