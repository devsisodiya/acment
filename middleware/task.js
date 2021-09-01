const multer = require('multer');

const imageFilter = (req, file, cb) => {

    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const task = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/task/');
    },
    filename: function (req, file, cb) {

        cb(null, "document_" + new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

module.exports.task = multer({
    storage: task,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    fileFilter: imageFilter,
}).single('task')
