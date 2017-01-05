#!/bin/env node

var config = require('./config');

if (config.https) {

	var exec = require('child_process').exec,
	cmd = 'mkdir -p certificates; openssl req -batch -newkey rsa:2048 -new -nodes -keyout certificates/key.pem -out certificates/csr.pem; openssl x509 -req -in certificates/csr.pem -signkey certificates/key.pem -out certificates/server.crt;';
	exec(cmd, function(error, stdout, stderr) {
	  if (error) {
	    console.log('exec error:', error);
	    return;
	  }
	  console.log('stdout: ', stdout);
	  console.log('stderr: ', stderr);
	});
	
}