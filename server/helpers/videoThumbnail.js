const { exec, spawn } = require('child_process');
const { createWriteStream } = require('fs');
const path = require('path');

const VideoDetails = require('../models/VideoDetails');
const config = require('config');
const port = config.port;
const basePath = config.isProduction
  ? `${config.protocol}://${config.host}`
  : `${config.protocol}://${config.host}:${config.port}`;
let ffmpegPath = config.ffmpegPath;
exec("which ffmpeg", (error, stdout, stderr) => {
  if (error) {
    console.log(`exec_error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`exec_stderr: ${stderr}`);
    return;
  }
  ffmpegPath = path.join(stdout.trim());
  console.log(`exec_stdout: ${ffmpegPath}`);

});

const width = 256;
const height = 144;

let generateThumbnail = (target, title, username) => {
  title = title.replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '');
  let tmpFile = createWriteStream('media/uploads/video_thumbnails/' + title + '.jpg');
  try {
    const ffmpeg = spawn(ffmpegPath, [
      '-ss',
      0,
      '-i',
      target,
      '-vf',
      `thumbnail,scale=${width}:${height}`,
      '-qscale:v',
      '2',
      '-frames:v',
      '1',
      '-f',
      'image2',
      '-c:v',
      'mjpeg',
      'pipe:1'
    ]);
    ffmpeg.stdout.pipe(tmpFile);
  } catch (ex) {
    console.error(ex);
  }
  const videoDetails = new VideoDetails({
    uploader_name: username,
    upload_title: title,
    video_path: target,
    thumbnail_path: basePath + "/api/videos/video_thumbnails/" + encodeURIComponent(title + '.jpg')
  });
  videoDetails
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  generateThumbnail: generateThumbnail
}