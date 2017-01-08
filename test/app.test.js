var http = require('http'),
querystring = require('querystring'),
config;

console.log('> Run server.js and test all the app');
if (!process.env.PORT) {
  process.env.PORT = 8080;
}
require('../server');
config = require('../config');

module.exports.task = function(test, cb) {
  var postData = querystring.stringify(test.form? test.form:{}),
  log = test.method + ' ' + test.route + ' ' + test.txt,
  options = {
    hostname: '127.0.0.1',
    port: process.env.PORT,
    path: test.route,
    method: test.method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  },
  req = http.request(options, function(res) {
    res.setEncoding('utf8');
     res.on('data', function(chunk) {
       cb(null, {err: false, req: log, res: chunk});
    });
  });

  req.on('error', function(e) {
    cb(null, {err: true, req: log, res: e});
  });

  req.write(postData);
  req.end();

};

exports.tests = [
  {
    route: '/',
    txt: 'should return an error',
    method: 'GET',
  },
  {
    route: '/',
    txt: 'should return an error',
    method: 'PUT',
  },
  {
    route: '/export',
    method: 'POST',
    txt: 'should be unauthorized',
    form: {key:'fake'},
  },
  {
    route: '/import',
    method: 'POST',
    txt: 'should add kim@gmail.com,kim2@gmail.com',
    form: {key:config.key, data:'kim@gmail.com\nkim2@gmail.com'},
  },
  {
    route: '/add',
    method: 'POST',
    txt: 'should add kim@gmail.com',
    form: {email:'kim@gmail.com'},
  },
  {
    route: '/add',
    method: 'POST',
    txt: 'should add kim@outlook.com',
    form: {email:'kim@outlook.com'},
  },
  {
    route: '/add',
    method: 'POST',
    txt: 'should add kim@yahoo.com',
    form: {email:'kim@yahoo.com'},
  },
  {
    route: '/remove',
    method: 'POST',
    txt: 'should remove kim2@gmail.com',
    form: {key:config.key, email:'kim2@gmail.com'},
  },
  {
    route: '/export',
    method: 'POST',
    txt: 'should export the list',
    form: {key:config.key},
  },
  {
    route: '/empty',
    method: 'POST',
    txt: 'should clear all the list',
    form: {key:config.key},
  },
];
