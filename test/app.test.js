var request = require('request'),
serverUrl = 'http://127.0.0.1',
config = {};

console.log('> Run server.js and test all the app');
if (!process.env.PORT) {
  process.env.PORT = 8080;
}
serverUrl = serverUrl + ':' + process.env.PORT;
require('../server');

// Load config after require server.js
config = require('../config');

module.exports.task = function(test, cb) {
  request({
    method: test.method,
    uri: serverUrl + test.route,
    form: test.form? test.form:{},
  }, function (err, response, body) {
    var log = test.method + ' ' + test.route + ' ' + test.should;
    if (err) {
      cb({log: log, res: err});
    }
    else {
      cb(null, {log: log, res: body});
    }
  })
};

exports.tests = [
  {
    route: '/',
    should: 'should return an error',
    method: 'GET',
  },
  {
    route: '/',
    should: 'should return an error',
    method: 'PUT',
  },
  {
    route: '/export',
    method: 'POST',
    should: 'should be unauthorized',
    form: {key:'fake'},
  },
  {
    route: '/import',
    method: 'POST',
    should: 'should add kim@gmail.com,kim2@gmail.com',
    form: {key:config.key, data:'kim@gmail.com\nkim2@gmail.com'},
  },
  {
    route: '/add',
    method: 'POST',
    should: 'should add kim@gmail.com',
    form: {email:'kim@gmail.com'},
  },
  {
    route: '/add',
    method: 'POST',
    should: 'should add kim@outlook.com',
    form: {email:'kim@outlook.com'},
  },
  {
    route: '/add',
    method: 'POST',
    should: 'should add kim@yahoo.com',
    form: {email:'kim@yahoo.com'},
  },
  {
    route: '/remove',
    method: 'POST',
    should: 'should remove kim2@gmail.com',
    form: {key:config.key, email:'kim2@gmail.com'},
  },
  {
    route: '/export',
    method: 'POST',
    should: 'should export the list',
    form: {key:config.key},
  },
  {
    route: '/empty',
    method: 'POST',
    should: 'should clear all the list',
    form: {key:config.key},
  },
];
