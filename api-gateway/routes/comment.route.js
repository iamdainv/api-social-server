/** @format */

const express = require("express");
const router = express.Router();
const httpProxy = require("express-http-proxy");
// const authMiddleWare = require("../middleware/auth.middleware");
require("dotenv").config();

const authServiceProxy = httpProxy(process.env.API_AUTH_CHAT);

router.post("/v1/comment/", authServiceProxy);
router.get("/v1/comment/", authServiceProxy);
router.put("/v1/comment/:id", authServiceProxy);
router.delete("/v1/comment/:id", authServiceProxy);
module.exports = router;
