'use strict'

const nodemailer = require('nodemailer')
const db = require('../utils/db')
const { checkAuthKey, isEmail } = require('../utils/helpers')
const { UnauthorizedError, ConflictError } = require('../utils/errors')

module.exports = {
  POST: async (req) => {
    const data = await db.open()
    if (!checkAuthKey(req, data.keys(), 'private')) {
      return UnauthorizedError()
    }

    if (!isEmail(req.body.user)) {
      return ConflictError('Wrong user')
    }

    // If OAuth 2 token not provided use password
    if (!req.body.token) {
      if (!req.body.password) {
        return ConflictError('Empty password')
      }
    }

    if (!req.body.service) {
      return ConflictError('Empty service')
    }

    if (!req.body.subject) {
      return ConflictError('Empty subject')
    }

    if (!req.body.body) {
      return ConflictError('Empty body')
    }

    const { user, token, password, service, subject, body, test } = req.boby

    const auth = {
      user,
      // If token exists use OAuth2 as auth type or simply a password
      ...(token && { type: 'OAuth2', accessToken: token }) || { pass: password }
    }

    const message = {
      from: user,
      to: user,
      // If not testing add the mailing list to bcc
      ...(!test && { bcc: data.export() }) || {},
      subject,
      html: body
    }

    const transporter = nodemailer.createTransport({ service, auth })
    const sendMail = () => new Promise((resolve, reject) => {
      transporter.sendMail(message, (err) => {
        if (err) {
          return reject(err)
        }
        resolve({ data: '' })
      })
    })

    let status
    try {
      status = await sendMail()
    } catch (err) {
      status = ConflictError(err)
    }

    return status
  }
}
