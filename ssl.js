'use strict'

const fs = require('fs')

async function selfSigned () {
  const exec = require('child_process').exec
  const cmd = `
    openssl req -batch -newkey rsa:2048 -new -nodes -keyout ssl.key -out ssl.csr;
    openssl x509 -req -in ssl.csr -signkey ssl.key -out ssl.crt;
  `
  const error = s => (`\x1b[38;5;01m[ERR] ${s} \x1b[0m`)

  await exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      console.error(error('openssl is required'))
      process.exit(1)
    }

    console.log(stdout)
    console.log(stderr)

    // Authorize HTTPS connections with self-signed SSL certificates
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  })
}

const key = () => fs.existsSync('ssl.key') && fs.readFileSync('ssl.key', 'utf-8')
const cert = () => fs.existsSync('ssl.crt') && fs.readFileSync('ssl.crt', 'utf-8')

if (!key() || !cert()) {
  selfSigned()
}

module.exports = {
  key: key(),
  cert: cert()
}
