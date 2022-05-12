/** @format */

const express = require("express");
const router = express.Router();
const httpProxy = require("express-http-proxy");
// const authMiddleWare = require("../middleware/auth.middleware");
require("dotenv").config();

const authServiceProxy = httpProxy(process.env.API_AUTH_CHAT);

router.get("/v1/category/add", authServiceProxy);
router.get("/v1/category/", authServiceProxy);

module.exports = router;
