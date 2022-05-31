const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
const urlMetadata = require('url-metadata');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();
// urlMetadata('https://www.youtube.com/watch?v=wNO6kMJB63I&list=RDwNO6kMJB63I&index=1').then(
//   function (metadata) {
//     // success handler
//     console.log(metadata);
//   },
//   function (error) {
//     // failure handler
//     console.log(error);
//   }
// );
cloudinary.config({
  cloud_name: 'social-app-5-01',
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinarySecret,
  secure: true,
});

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// app.use(cors(corsOptions));

app.use(
  fileUpload({
    // limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
