const express = require('express');

const messagesController = require('../../controllers/messages.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/v1/message/:chatId', auth(), messagesController.getMessageOfRoom);
router.post('/v1/message/newmessage', auth(), messagesController.createNeMessage);

module.exports = router;
