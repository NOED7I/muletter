'use strict'

const config = require('./config')
const errors = require('./errors')
const router = require('./router')

const red = () => {
  return `\x1b[38;5;01m[ERR] ${this} \x1b[0m`
}

const PORT = parseInt(process.env.PORT || config.PORT, 10) || 443
const HOST = process.env.HOST || config.HOST || null
const FORCE_SSL = process.env.FORCE_SSL || config.FORCE_SSL || false

let KEY = process.env.KEY || config.KEY || ''
// If no access key is defined generate one
if (!KEY) {
  // Crypto required
  try {
    KEY = require('crypto').randomBytes(20).toString('hex')
  } catch (Exception) {
    console.log('[Exception]', Exception)
    console.error(red('crypto support is required :'), 'this Node.js build does not include support for the crypto module')
    process.exit(1)
  }
  console.log('> Access key:', KEY)
}

// Export var env
module.exports = { PORT, HOST, KEY }

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
    let auth = req.body.key === KEY

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
          res.writeHead(errors[data.code])
        }

        // Send JSON data
        res.end(JSON.stringify(data))
      }
    })
  })
}

const log = () => {
  console.log(`> Listening on port ${PORT} - HTTPS is ${PORT === 443 || FORCE_SSL ? 'enabled' : 'disabled'}`)
}

// Enable HTTPS only if PORT 443 is used or SSL forced
if (PORT === 443 || FORCE_SSL) {
  const https = require('https')
  https.createServer(require('./ssl'), handleRequest).listen(PORT, HOST, log)
} else {
  const http = require('http')
  http.createServer(handleRequest).listen(PORT, HOST, log)
}
