'use strict'

const db = require('../utils/db')

const status = async () => {
  const data = await db.open()
  const keys = data.keys('new')
  console.log(`Private Key: ${keys.private}\nPublic Key: ${keys.public}`)
}

try {
  status()
} catch(e) {
  console.error(e)
}