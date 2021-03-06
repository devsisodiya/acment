const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/*"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const profile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "image_" + new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
  },
});

module.exports.profile = multer({
  storage: profile,
  // limits: {
  //     fileSize: 1024 * 1024 * 5
  // },
  fileFilter: imageFilter,
}).single("image");
