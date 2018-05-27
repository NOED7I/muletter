'use scrict'

const { checkAuthKey, isEmail } = require('../utils/helpers')
const { ConflictError, UnauthorizedError } = require('../utils/errors')
const db = require('../utils/db')

module.exports = {
  POST: async (req) => {
    const data = await db.open()
    if (!checkAuthKey(req, data.keys(), 'public')) {
      return UnauthorizedError()
    }
    
    const { email } = req.body

    // Add if valid and non-existent email
    if (isEmail(email) && data.indexOf(email) === -1) {
      data.add(email)
    }
    
    return { data: email }
  },

  DELETE: async (req) => {
    const data = await db.open()
    if (!checkAuthKey(req, data.keys(), 'public')) {
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

  PUT: async (req) => {
    const data = await db.open()
    if (!checkAuthKey(req, data.keys(), 'private')) {
      return UnauthorizedError()
    }

    const { emails } = req.body
    if (!emails) {
      return ConflictError('Empty Data')
    }

    data.import(emails.split('\n'))
    return { data: emails } 
  },

  GET: async (req) => {
    const data = await db.open()
    if (!checkAuthKey(req, data.keys(), 'private')) {
      return UnauthorizedError()
    }

    return { data: data.export().join('\n') }
  }
}