'use strict'

const db = require('../utils/db')
const { checkAuthKey, getKeys } = require('../utils/helpers')
const { UnauthorizedError } = require('../utils/errors')

module.exports = {
  GET: async (req, name = 'subscribers') => {
    const data = await db.open(name)
    if (!checkAuthKey(req, getKeys(), 'private')) {
      return UnauthorizedError()
    }

    return {
      count: data.export().length,
      keys: getKeys(),
      version: require('../package.json').version
    }
  }
}
