'use strict'

const routes = require('./routes')
const { MethodNotAllowedError, NotFoundError } = require('./errors')

module.exports = (req, auth, next = () => {}) => {
  let route
  let parsedUrl = require('url').parse(req.url).pathname

  // trim parsedUrl
  if (parsedUrl.charAt(0) === '/') {
    parsedUrl = parsedUrl.substr(1, parsedUrl.length - 1)
  }

  if (parsedUrl.charAt(parsedUrl.length - 1) === '/') {
    parsedUrl = parsedUrl.substr(0, parsedUrl.length - 1)
  }

  // get route
  route = parsedUrl.split('/').shift()

  if (route === '') {
    return next(require('./index'))
  }

  if (req.method !== 'POST') {
    return next(MethodNotAllowedError())
  }

  if (typeof routes[route] === 'undefined') {
    return next(NotFoundError())
  }

  routes[route](req, auth, next)
}
