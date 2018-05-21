'use strict'

const fs = require('fs')
const config = require('./config')

const SSL_DOMAIN = process.env.SSL_DOMAIN || config.SSL_DOMAIN || null
const SSL_KEY = process.env.SSL_KEY || config.SSL_KEY || null
const SSL_CERT = process.env.SSL_CERT || config.SSL_CERT || null

const trusted = (key = SSL_KEY, cert = SSL_CERT) => new Promise((resolve, reject) => {
  // Test if key and cert exist
  try {
    fs.existsSync(key) && fs.existsSync(cert)
  } catch (err) {
    reject(err)
  }

  // Test if key and cert have a read access
  try {
    fs.accessSync(key, fs.constants.R_OK) && fs.accessSync(cert, fs.constants.R_OK)
  } catch (err) {
    reject(err)
  }

  resolve({
    key: fs.readFileSync(key, 'utf-8'),
    cert: fs.readFileSync(cert, 'utf-8')
  })
})

const selfSigned = () => new Promise((resolve, reject) => {
  const domain = SSL_DOMAIN || 'localhost'
  const cmd = `openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout ssl.key -out ssl.cert -subj "/CN=${domain}" -days 3650`
  require('child_process').exec(cmd, (err, stdout, stderr) => {
    if (err) {
      reject(new Error(`${stderr}cmd: ${err.cmd}`))
    } else {
      // Authorize HTTPS connections with self-signed SSL certificates
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
      resolve({
        key: fs.existsSync('ssl.key') && fs.readFileSync('ssl.key', 'utf-8'),
        cert: fs.existsSync('ssl.cert') && fs.readFileSync('ssl.cert', 'utf-8')
      })
    }
  })

  // Trigger all events when stop to delete self-signed SSL certificates
  process.on('SIGINT', () => { process.exit() })
  process.on('SIGILL', () => { process.exit() })
  process.on('SIGHUP', () => { process.exit() })
  process.on('SIGBREAK', () => { process.exit() })
  process.on('exit', () => {
    fs.existsSync('ssl.key') && fs.unlinkSync('ssl.key')
    fs.existsSync('ssl.cert') && fs.unlinkSync('ssl.cert')
  })
})

module.exports = {
  get: SSL_KEY && SSL_CERT ? trusted : selfSigned,
  selfSigned,
  trusted
}
