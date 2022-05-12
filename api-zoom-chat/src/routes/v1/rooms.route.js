const express = require('express');

const roomsController = require('../../controllers/rooms.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/v1/rooms', auth(), roomsController.getRoomsOfUser);
router.post('/v1/rooms', auth(), roomsController.createNewRoom);
router.get('/v1/rooms/:id', auth(), roomsController.getRoomById);

module.exports = router;
