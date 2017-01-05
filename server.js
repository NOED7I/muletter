#!/bin/env node

var config = require('./config'),
errors = require('./errors'),
router = require('./router');

function handleRequest(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // REST Methods and JSON
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Content-Type", "application/json");

  // Get Body Data
  var buffer = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    buffer += chunk;
  });

  req.on('end', function() {

    // Body Parser : QueryString to Object
    req.body = require('querystring').parse(buffer.trim());

    // Authentication
    var auth = req.body.key == config.key ? true : false;

    router(req, auth, function (data) {

      // Errors Status Code
      if (typeof data === 'object' && data.errors && data.code) {
        res.statusCode = errors[data.code];
      }

      // Send JSON data
      res.end(JSON.stringify(data));

    });

  });

}

function logServer() {

  console.log('HTTP(S) Server is running on : ' + config.host + ':' + config.port);

}

if (config.https) {

  var https = require('https'),
  fs = require('fs');
  https.createServer({
    key: fs.readFileSync('certificates/key.pem', 'utf-8'),
    cert: fs.readFileSync('certificates/server.crt', 'utf-8')
  }, handleRequest).listen(config.port, config.host, logServer);

}

else {

  var http = require('http');
  http.createServer(handleRequest).listen(config.port, config.host, logServer);

}
