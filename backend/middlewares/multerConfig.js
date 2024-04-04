const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    // console.log(file);
    const originalFileName = file.originalname;
    const fileExtension = path.extname(originalFileName);
    const newFileName = `${Date.now()}${fileExtension}`;
    cb(null, newFileName);
    // cb(null, file.originalname + "-" + Date.now() + ".jpg");
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
