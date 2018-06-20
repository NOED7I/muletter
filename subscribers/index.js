'use scrict'

const { checkAuthKey, isEmail, getKeys } = require('../utils/helpers')
const { UnauthorizedError } = require('../utils/errors')
const db = require('../utils/db')

module.exports = {
  POST: async (req, name = 'subscribers') => {
    const data = await db.open(name)
    if (!checkAuthKey(req, getKeys(), 'public')) {
      return UnauthorizedError()
    }

    const { email } = req.body

    // Add if valid and non-existent email
    if (isEmail(email) && data.indexOf(email) === -1) {
      data.add(email)
    }

    return { data: email }
  },

  DELETE: async (req, name = 'subscribers') => {
    const data = await db.open(name)
    if (!checkAuthKey(req, getKeys(), 'public')) {
      return UnauthorizedError()
    }

    const { email } = req.body
    const index = data.indexOf(email)

    // Delete if valid and existing email
    if (isEmail(email) && index !== -1) {
      data.del(index)
    }

    return { data: email }
  },

  GET: async (req, name = 'subscribers') => {
    const data = await db.open(name)
    if (!checkAuthKey(req, getKeys(), 'private')) {
      return UnauthorizedError()
    }

    return { data: data.export().join('\n') }
  }
}
