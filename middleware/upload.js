const multer = require('multer');
const path = require('path');

/** Storage Engine */
const storageEngine = multer.diskStorage({
    destination: './public/files',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//init
const upload = multer({
    storage: storageEngine
    // ,
    // fileFilter: function (req, file, callback) {
    //     validateFile(file, callback);
    // }
}).single('myImage');


var validateFile = function (file, cb) {
    allowedFileTypes = /mp3|flac|3gp|wav/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type. Only mp3, flac, 3gp and wav file are allowed.")
    }
}

module.exports = upload;