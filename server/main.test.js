'use strict'

const test = require('ava')

const { PORT, HOST } = require('./main')

const request = (method, path, body = {}) => new Promise((resolve, reject) => {
  const data = require('querystring').stringify(body)
  const options = {
    hostname: HOST || '127.0.0.1',
    port: PORT,
    method,
    path,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  }
  require('http').request(options, res => {
    let buffer = ''
    res.on('data', chunk => {
      buffer += chunk
    })
    res.on('end', () => {
      if (res.statusCode === 200) {
        resolve(buffer)
      } else {
        resolve(res)
      }
    })
  }).end(data)
})

test.skip('POST /subscribers { email: email@provider.com } - should return a JSON response', async t => {
  const res = await request('POST', '/subscribers', { email: 'email@provider.com' })
  try {
    JSON.parse(res)
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test('UPDATE /add {} - should return Bad Request Error', async t => {
  const res = await request('UPDATE', '/add')
  t.is(res.statusCode, 400)
})
