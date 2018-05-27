'use strict'

class ApiError {
  constructor (statusCode, message = '') {
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = {
  ConflictError: (message) => new ApiError(409, message),
  NotFoundError: (message) => new ApiError(404, message),
  UnauthorizedError: (message) => new ApiError(401, message),
  MethodNotAllowedError: (message) => new ApiError(405, message)
}
