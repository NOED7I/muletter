'use strict'

const { checkAuthKey, getKeys } = require('../utils/helpers')
const { UnauthorizedError } = require('../utils/errors')

module.exports = {
  GET: (req) => {
    if (!checkAuthKey(req, getKeys(), 'public')) {
      return UnauthorizedError()
    }

    return {
      data: {
        banner: process.env.BANNER_URL
      }
    }
  }
}
