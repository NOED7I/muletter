'use strict';

module.exports.ConflictError = 409;
module.exports.NotFoundError = 404;
module.exports.UnauthorizedError = 401;

module.exports.Conflict = (msg, err) => ({
  code: 'ConflictError',
  message: msg? msg : '',
  errors: err && typeof err.errors !== 'undefined' ? err.errors : (err? err: {})
});

module.exports.NotFound = (msg, err) => ({
  code: 'NotFoundError',
  message: msg? msg : '',
  errors: err && typeof err.errors !== 'undefined' ? err.errors : (err? err: {})
});

module.exports.Unauthorized = (msg, err) => ({
  code: 'UnauthorizedError',
  message: msg? msg : '',
  errors: err && typeof err.errors !== 'undefined' ? err.errors : (err? err: {})
});
