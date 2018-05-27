'use strict'

const test = require('ava')
const db = require('../utils/db')
const status = require('./index')
const { UnauthorizedError } = require('../utils/errors')

test.serial('GET -- unauthorized', async t => {
  const data = await db.open()
  const headers = {
    authorization: `Basic ${data.keys().public}`
  }
  const output = await status.GET({ headers })
  t.deepEqual(output, UnauthorizedError())
})

test.serial('GET', async t => {
  const data = await db.open()
  const headers = {
    authorization: `Basic ${data.keys().private}`
  }
  const expected = {
    count: data.export().length,
    keys: data.keys(),
    version: require('../package.json').version 
  }
  const output = await status.GET({ headers })
  t.deepEqual(output, expected)
})