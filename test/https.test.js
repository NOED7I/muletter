'use strict';

let config = require('../config');

config.https = true;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('../ssl');

module.exports = require('./app.test');
