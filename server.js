'use strict'

const config = require('./config')
const router = require('./router')

const red = (err) => {
  return `\x1b[38;5;01m[ERR] ${err} \x1b[0m`
}

const HTTP_PORT = parseInt(process.env.HTTP_PORT || config.HTTP_PORT, 10) || 443
const HTTP_HOST = process.env.HTTP_HOST || config.HTTP_HOST || null
const FORCE_SSL = process.env.FORCE_SSL || config.FORCE_SSL || false

let ACCESS_KEY = process.env.ACCESS_KEY || config.ACCESS_KEY || ''
// If no access key is defined generate one
if (!ACCESS_KEY) {
  // Crypto required
  try {
    ACCESS_KEY = require('crypto').randomBytes(20).toString('hex')
  } catch (Exception) {
    console.log('[Exception]', Exception)
    console.error(red('crypto support is required :'), 'this Node.js build does not include support for the crypto module')
    process.exit(1)
  }
  if (process.env.NODE_ENV !== 'test') {
    console.log('> Access key:', ACCESS_KEY)
  }
}

// Export var env
module.exports = { HTTP_PORT, HTTP_HOST, ACCESS_KEY }

const handleRequest = (req, res) => {
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
    let auth = req.body.key === ACCESS_KEY

    router(req, auth, (data = {}) => {
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

        // Send statusCode if error
        if (data.constructor.name === 'ApiError') {
          res.writeHead(data.statusCode)
        }

        // Send JSON data
        res.end(JSON.stringify(data))
      }
    })
  })
}

const log = () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`> Listening on port ${HTTP_PORT} - HTTPS is ${HTTP_PORT === 443 || FORCE_SSL ? 'enabled' : 'disabled'}`)
  }
}

// Enable HTTPS only if PORT 443 is used or SSL forced
if (HTTP_PORT === 443 || FORCE_SSL) {
  const https = require('https')
  require('./ssl').get().then((ssl) => {
    https.createServer(ssl, handleRequest).listen(HTTP_PORT, HTTP_HOST, log)
  }).catch(err => console.error(err))
} else {
  const http = require('http')
  http.createServer(handleRequest).listen(HTTP_PORT, HTTP_HOST, log)
}
