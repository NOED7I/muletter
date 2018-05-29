'use strict'

const test = require('ava')
const db = require('../utils/db')

const { PORT, HOST } = require('./main')

const request = (method, path, body = {}, key = '') => new Promise((resolve, reject) => {
  const data = require('querystring').stringify(body)
  const options = {
    hostname: HOST || '127.0.0.1',
    port: PORT,
    method,
    path,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data),
      'Authorization': `Basic ${key}`
    }
  }

  require('http').request(options, res => {
    let buffer = ''
    res.on('data', chunk => {
      buffer += chunk
    })
    res.on('end', () => {
      resolve({ res, buffer })
    })
  }).end(data)
})

let data = {}

test.before(async () => {
  const { createKeys } = require('../utils/helpers')
  await db.write('keys', createKeys())
  data = await db.open()
})

test('POST /subscribers { email: email@provider.com } - should return a JSON response', async t => {
  const { buffer } = await request('POST', '/subscribers', { email: 'email@provider.com' }, data.keys().private)
  try {
    JSON.parse(buffer)
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test('UPDATE /add {} - should return Bad Request Error', async t => {
  const { res } = await request('UPDATE', '/add')
  t.is(res.statusCode, 400)
})

test.after(async () => {
  await db.drop()
})
