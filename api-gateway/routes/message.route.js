/** @format */

const express = require("express");
const router = express.Router();
const httpProxy = require("express-http-proxy");
// const authMiddleWare = require("../middleware/auth.middleware");
require("dotenv").config();

const roomsServiceProxy = httpProxy(process.env.API_CHAT);

router.get("/v1/message/:chatId", roomsServiceProxy);
router.post("/v1/message/newmessage", roomsServiceProxy);

module.exports = router;
