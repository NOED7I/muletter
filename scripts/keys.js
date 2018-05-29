'use strict'

const db = require('../utils/db')
if (process.argv[2] === '--update') {
  require('fs').unlinkSync(db.path('keys'))
}

let keys = {}
try {
  keys = require('../db/keys.json')
} catch (e) {
  const { createKeys } = require('../utils/helpers')
  const init = async () => {
    keys = createKeys()
    await db.write('keys', keys)
  }
  init()
} finally {
  console.log(`Private Key : ${keys.private}\nPublic Key : ${keys.public}`)
}
