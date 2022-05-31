const catchAsync = require('../utils/catchAsync');
// const { roomsService } = require('../services');
const cloudinary = require('cloudinary').v2;
const uploadSingleFile = catchAsync(async (req, res) => {
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
    if (result && !error) return res.status(200).send({ file: result, code: 200 });
  });
});

module.exports = {
  uploadSingleFile,
};
