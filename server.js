'use strict'

const errors = require('./errors')
const router = require('./router')

const red = () => {
  return `\x1b[38;5;01m[ERR] ${this} \x1b[0m`
}

let config = require('./config')
let crypto

// if env var PORT is used
if (process.env.PORT) {
  config.port = process.env.PORT
}

// port required
if (!config.port || isNaN(config.port)) {
  console.error(red('port is required'))
  process.exit(1)
}

if (!config.key) {
  // crypto required
  try {
    crypto = require('crypto')
  } catch (Exception) {
    console.log('[Exception]', Exception)
    console.error(red('crypto support is required :'), 'this Node.js build does not include support for the crypto module')
    process.exit(1)
  }

  // generate an access key
  config.key = crypto.randomBytes(20).toString('hex')
  console.log('> Access key:', config.key)
}

function handleRequest (req, res) {
  // Get Body Data
  let buffer = ''
  req.setEncoding('utf8')
  req.on('data', chunk => {
    buffer += chunk
  })

  req.on('end', () => {
    // Body Parser : QueryString to Object
    req.body = require('querystring').parse(buffer.trim())

    // Authentication
    let auth = req.body.key === config.key

    router(req, auth, data => {
      if (typeof data === 'string') {
        // Send Html
        res.writeHead(200)
        res.end(data, 'binary')
      } else {
        // CORS
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

        // REST Methods and JSON
        res.setHeader('Access-Control-Allow-Methods', 'POST')
        res.setHeader('Content-Type', 'application/json')

        // Errors Status Code
        if (typeof data === 'object' && data.errors && data.code) {
          res.statusCode = errors[data.code]
        }

        // Send JSON data
        res.end(JSON.stringify(data))
      }
    })
  })
}

function logServer () {
  console.log('> Listening on port:', config.port)
}

if (config.https) {
  const https = require('https')
  const fs = require('fs')
  https.createServer({
    key: fs.readFileSync('certificates/key.pem', 'utf-8'),
    cert: fs.readFileSync('certificates/server.crt', 'utf-8')
  }, handleRequest).listen(config.port, config.host ? config.host : false, logServer)
} else {
  const http = require('http')
  http.createServer(handleRequest).listen(config.port, config.host ? config.host : false, logServer)
}
