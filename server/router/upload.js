const express = require('express');
const router = express.Router();
const multer = require('multer');

const thumbnailGenerator = require('../helpers/videoThumbnail')
const config = require('config');
const port = config.port;
const basePath = config.isProduction
  ? `${config.protocol}://${config.host}`
  : `${config.protocol}://${config.host}:${config.port}`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`destination: callback now...`);
    cb(null, 'media/uploads');
  },
  filename: (req, file, cb) => {
    console.log(`filename: callback now...`);
    cb(null, file.originalname.replace(/ /g, '_'));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 // 50MB
  }
});

router.post('/', upload.single('file'), (req, res, next) => {
  console.log(`executing callback now...`);
  thumbnailGenerator.generateThumbnail(
    // /api/videos is made publically available in App.js
    basePath + '/api/videos/' + req.file.filename.replace(/ /g, '_'),
    req.file.filename.replace(/ /g, '_'),
    req.userData.firstName);
  console.log(`sending response now...`);
  res.status(200).json({
    message: 'Video upload successful'
  });
});

module.exports = router