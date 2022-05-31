const express = require('express');

const uploadController = require('../../controllers/upload.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/v1/upload/single', auth(), uploadController.uploadSingleFile);

module.exports = router;
