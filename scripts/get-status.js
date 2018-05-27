'use strict'

const db = require('../utils/db')

const status = async () => {
  const data = await db.open()
  const keys = data.keys()
  console.log(`Muletter-server version ${require('../package.json').version}\nNumber of subscribers: ${data.export().length}\nPrivate Key: ${keys.private}\nPublic Key: ${keys.public}`)
}

try {
  status()
} catch(e) {
  console.error(e)
}
