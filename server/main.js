'use strict'

const config = require('./config')
const router = require('./router')

const PORT = parseInt(process.env.PORT || config.PORT, 10) || 443
const HOST = process.env.HOST || config.HOST || null
module.exports = { PORT, HOST }

const FORCE_SSL = process.env.FORCE_SSL || config.FORCE_SSL || false

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

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    // Credentials access keys
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true)

    // REST Methods and JSON
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    res.setHeader('Content-Type', 'application/json')

    router(req, (data = {}) => {
      // Send statusCode if error
      if (data.constructor.name === 'ApiError') {
        res.writeHead(data.statusCode)
      }

      // Send JSON data
      res.end(JSON.stringify(data))
    })
  })
}

const log = () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`> Listening on port ${PORT} - HTTPS is ${PORT === 443 || FORCE_SSL ? 'enabled' : 'disabled'}`)
  }
}

// Enable HTTPS only if PORT 443 is used or SSL forced
if (PORT === 443 || FORCE_SSL) {
  const https = require('https')
  require('./ssl').get().then((ssl) => {
    https.createServer(ssl, handleRequest).listen(PORT, HOST, log)
  }).catch(err => console.error(err))
} else {
  const http = require('http')
  http.createServer(handleRequest).listen(PORT, HOST, log)
}
