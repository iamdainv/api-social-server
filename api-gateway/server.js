/** @format */

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

const routes = require("./routes");

require("dotenv").config();

// if (config.env !== "test") {
// 	app.use(morgan.successHandler);
// 	app.use(morgan.errorHandler);
// }

const whitelist = ["http://localhost:3000"];
const corsOptions = {
	origin: function (origin, callback) {
		callback(null, true);
		console.log(origin, whitelist.indexOf(origin));
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};

server.use(morgan("dev"));

server.use(cors(corsOptions));
// if (process.env.NODE_ENV === "production") {
// 	server.use(cors(corsOptions));
// }

// // convert error to ApiError, if needed
// app.use(errorConverter);

// // handle error
// app.use(errorHandler);
server.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

server.use("/", routes);

// send back a 404 error for any unknown api request
server.use((req, res, next) => {
	console.log(req);
});
server.listen(process.env.PORT || "3210", (err) => {
	if (err) throw err;
	console.log("> Ready on http://localhost:3210");
});
