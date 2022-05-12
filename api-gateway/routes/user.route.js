/** @format */

const express = require("express");
const router = express.Router();
const httpProxy = require("express-http-proxy");
// const authMiddleWare = require("../middleware/auth.middleware");
require("dotenv").config();

const authServiceProxy = httpProxy(process.env.API_AUTH_CHAT);

router.route("/v1/users/").post(authServiceProxy).get(authServiceProxy);

router
	.route("/v1/users/:userId")
	.get(authServiceProxy)
	.patch(authServiceProxy)
	.delete(authServiceProxy);

module.exports = router;
