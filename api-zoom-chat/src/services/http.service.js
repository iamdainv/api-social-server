// eslint-disable-next-line import/no-extraneous-dependencies
const axios = require('axios');

const config = require('../config/config');

class HttpService {
  constructor(BASE_URL) {
    if (BASE_URL) {
      this.BASE_URL = BASE_URL;
    } else {
      this.BASE_URL = config.apiAuthChat;
    }
  }

  instance() {
    return axios.create({
      baseURL: this.BASE_URL,
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' },
    });
  }
}

module.exports = HttpService;
