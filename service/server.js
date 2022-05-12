/** @format */

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);

const envConfig = require("./env");

require("dotenv").config();
// if (config.env !== "test") {
// 	app.use(morgan.successHandler);
// 	app.use(morgan.errorHandler);
// }

const whitelist = ["http://localhost:3210", "https://localhost:3210"];
const corsOptions = {
	origin: function (origin, callback) {
		console.log(origin);
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

app.use(morgan("dev"));
app.use(cors(corsOptions));

// // convert error to ApiError, if needed
// app.use(errorConverter);

// // handle error
// app.use(errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.get("/abc", (req, res) => {
	console.log("ahihi duoc roi ne");

	res.json({
		abc: 123123,
	});
});

http.listen(envConfig.port, (err) => {
	if (err) throw err;
	console.log(`> Ready on http://localhost:${envConfig.port}`);
});
