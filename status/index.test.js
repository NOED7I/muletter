'use strict'

const test = require('ava')
const db = require('../utils/db')
const status = require('./index')
const { UnauthorizedError } = require('../utils/errors')
const { createKeys, getKeys } = require('../utils/helpers')

test.before(async () => {
  const keys = createKeys()
  process.env.PUBLIC_KEY = keys.public
  process.env.PRIVATE_KEY = keys.private
})

test.serial('GET -- unauthorized', async t => {
  const headers = {
    authorization: `Basic ${getKeys().public}`
  }
  const output = await status.GET({ headers }, 'status.test')
  t.deepEqual(output, UnauthorizedError())
})

test.serial('GET', async t => {
  const headers = {
    authorization: `Basic ${getKeys().private}`
  }
  const expected = {
    count: 0,
    keys: getKeys(),
    version: require('../package.json').version
  }
  const output = await status.GET({ headers }, 'status.test')
  t.deepEqual(output, expected)
})

test.after(async () => {
  await db.drop('status.test')
})
