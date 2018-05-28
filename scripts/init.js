'use strict'

const db = require('../utils/db')
const { createKeys } = require('../utils/helpers')

const init = async () => {
  const keys = createKeys()
  await db.write('keys', keys)
  console.log(`Private Key : ${keys.private}\nPublic Key : ${keys.public}`)
}

init()
