const multer = require('multer');

const imageFilter = (req, file, cb) => {

    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const answer = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/answer/');
    },
    filename: function (req, file, cb) {

        cb(null, "document_" + new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

module.exports.answer = multer({
    storage: answer,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    fileFilter: imageFilter,
}).single('answer')
