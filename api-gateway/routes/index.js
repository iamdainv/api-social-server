/** @format */

const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const categoryRoute = require("./category.route");
const postRoute = require("./post.route");
const commentRoute = require("./comment.route");
const roomsRoute = require("./room.route");
const messagesRoute = require("./message.route");
// const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
	{
		path: "",
		route: authRoute,
	},
	{
		path: "",
		route: userRoute,
	},
	{
		path: "",
		route: categoryRoute,
	},
	{
		path: "",
		route: postRoute,
	},
	{
		path: "",
		route: commentRoute,
	},
	{
		path: "",
		route: roomsRoute,
	},
	{
		path: "",
		route: messagesRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
