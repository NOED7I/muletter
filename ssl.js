'use strict';

let config = require('./config');

if (config.https) {

	const exec = require('child_process').exec,
  error = s => (`\x1b[38;5;01m[ERR] ${s} \x1b[0m`),
	cmd = `
    mkdir -p certificates;
    openssl req -batch -newkey rsa:2048 -new -nodes -keyout certificates/key.pem -out certificates/csr.pem;
    openssl x509 -req -in certificates/csr.pem -signkey certificates/key.pem -out certificates/server.crt;
  `;

	exec(cmd, (err, stdout, stderr) => {

    if (err) {
	    console.error(err);
      console.error(error('openssl is required'));
	    process.exit(1);
	  }

	  console.log(stdout);
    console.log(stderr);
	
  });
	
}
