'use strict'

const { MethodNotAllowedError, NotFoundError } = require('../utils/errors')

module.exports = (req, callback = () => {}) => {
  let route
  let parsedUrl = require('url').parse(req.url).pathname
  let methods

  // trim parsedUrl
  if (parsedUrl.charAt(0) === '/') {
    parsedUrl = parsedUrl.substr(1, parsedUrl.length - 1)
  }

  if (parsedUrl.charAt(parsedUrl.length - 1) === '/') {
    parsedUrl = parsedUrl.substr(0, parsedUrl.length - 1)
  }

  // get route
  route = parsedUrl.split('/').shift()

  if (!['GET', 'POST', 'DELETE', 'PUT'].includes(req.method)) {
    return callback(MethodNotAllowedError())
  }

  try {
    methods = require(`../${route}`)
  } catch (e) {
    callback(NotFoundError())
  }

  if (!methods || typeof methods[req.method] === 'undefined') {
    return callback(NotFoundError())
  }

  callback(methods[req.method](req))
}
