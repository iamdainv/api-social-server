const express = require('express');

const docsRoute = require('./docs.route');
const roomsRoute = require('./rooms.route');
const messageRoute = require('./message.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '',
    route: roomsRoute,
  },
  {
    path: '',
    route: messageRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
