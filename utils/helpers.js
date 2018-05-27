'use strict'

const isEmail = email => email && /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email)

const checkAuthKey = (req, keys, keyType) => {
  if (!req.headers.authorization) {
    return false
  }

  const headersAuth = req.headers.authorization.split(' ')
  if (headersAuth[0] !== 'Basic') {
    return false
  }
  if (headersAuth[1] !== keys[keyType]) {
    return false
  }

  return true
}

const createKeys = () => {
  let publicKey
  let privateKey

  // Crypto required
  try {
    publicKey = require('crypto').randomBytes(20).toString('base64')
    privateKey = require('crypto').randomBytes(20).toString('base64')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  return { private: privateKey, public: publicKey }
}

module.exports = {
  isEmail,
  checkAuthKey,
  createKeys
}
