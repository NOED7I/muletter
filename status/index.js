'use strict'

const db = require('../utils/db')
const { checkAuthKey } = require('../utils/helpers')
const { UnauthorizedError } = require('../utils/errors')

module.exports = {
  GET: async (req) => {
    const data = await db.open() 
    if (!checkAuthKey(req, data.keys(), 'private')) {
      return UnauthorizedError()
    }

    return {
      count: data.export().length,
      keys: data.keys(),
      version: require('../package.json').version 
    }
  }
}