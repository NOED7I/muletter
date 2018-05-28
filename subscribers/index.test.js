'use strict'

const test = require('ava')
const route = require('./index')
const db = require('../utils/db')
const { ConflictError, UnauthorizedError } = require('../utils/errors')

test.before(async () => {
  const { createKeys } = require('../utils/helpers')
  await db.write('keys', createKeys())
})

test.serial('POST -- unauthorized', async t => {
  const data = await db.open()
  const body = { email: 'email@host.io' }
  const headers = {}
  const output = await route.POST({ body, headers })
  t.deepEqual(output, UnauthorizedError())
  setTimeout(() => {
    t.is(data.indexOf(body.email), -1)
  }, 100)
})

test.serial('POST -- wrong email', async t => {
  const data = await db.open()
  const body = { email: 'e' }
  const headers = {
    authorization: `Basic ${data.keys().public}`
  }
  const output = await route.POST({ body, headers })
  t.deepEqual(output, { data: body.email })
  setTimeout(() => {
    t.is(data.indexOf(body.email), -1)
  }, 100)
})

test.serial('POST - existing email', async t => {
  const data = await db.open()
  const body = { email: 'email@host.io' }
  const headers = {
    authorization: `Basic ${data.keys().public}`
  }
  const output = await route.POST({ body, headers })
  t.deepEqual(output, { data: body.email })
  setTimeout(() => {
    t.is(data.indexOf(body.email), 0)
  }, 100)
  const output2 = await route.POST({ body, headers })
  t.deepEqual(output2, { data: body.email })
  setTimeout(() => {
    t.is(data.indexOf(body.email), 0)
  }, 100)
})

test.serial('DELETE -- unauthorized', async t => {
  const data = await db.open()
  const body = { email: 'email@host.io' }
  const headers = {}
  const output = await route.DELETE({ body, headers })
  t.deepEqual(output, UnauthorizedError())
  setTimeout(() => {
    t.is(data.indexOf(body.email), 0)
  }, 100)
})

test.serial('DELETE -- wrong email', async t => {
  const data = await db.open()
  const body = { email: 'e' }
  const headers = {
    authorization: `Basic ${data.keys().public}`
  }
  const output = await route.DELETE({ body, headers })
  t.deepEqual(output, { data: body.email })
  setTimeout(() => {
    t.is(data.indexOf(body.email), -1)
  }, 100)
})

test.serial('DELETE - existing email', async t => {
  const data = await db.open()
  const body = { email: 'email@host.io' }
  const headers = {
    authorization: `Basic ${data.keys().public}`
  }
  t.is(data.indexOf(body.email), 0)
  const output = await route.DELETE({ body, headers })
  t.deepEqual(output, { data: body.email })
  setTimeout(async () => {
    t.is(data.indexOf(body.email), -1)
    await db.drop()
  }, 100)
})

test.serial('PUT -- unauthorized', async t => {
  const data = await db.open()
  const body = { emails: 'email@host.io\nemail2@host.io\nemail3@host.io' }
  const headers = {
    authorization: `Basic ${data.keys().public}`
  }
  const output = await route.PUT({ body, headers })
  t.deepEqual(output, UnauthorizedError())
  setTimeout(() => {
    t.is(data.indexOf('email@host.io'), -1)
  }, 100)
})

test.serial('PUT', async t => {
  const data = await db.open()
  const body = { emails: 'email1@host.io\nemail2@host.io\nemail3@host.io' }
  const headers = {
    authorization: `Basic ${data.keys().private}`
  }
  const output = await route.PUT({ body, headers })
  t.deepEqual(output, { data: body.emails })
  setTimeout(() => {
    t.is(data.indexOf('email1@host.io'), 0)
    t.is(data.indexOf('email2@host.io'), 1)
    t.is(data.indexOf('email3@host.io'), 2)
  }, 100)
})

test.serial('PUT -- nodata', async t => {
  const data = await db.open()
  const body = { emails: '' }
  const headers = {
    authorization: `Basic ${data.keys().private}`
  }
  const output = await route.PUT({ body, headers })
  t.deepEqual(output, ConflictError('Empty Data'))
})

test.serial('GET -- unauthorized', async t => {
  const headers = {}
  const output = await route.GET({ headers })
  t.deepEqual(output, UnauthorizedError())
})

test.serial('GET -- after import', async t => {
  const data = await db.open()
  const headers = { authorization: `Basic ${data.keys().private}` }
  const output = await route.GET({ headers })
  t.deepEqual(output, { data: 'email1@host.io\nemail2@host.io\nemail3@host.io' })
})

test.after(async () => {
  await db.drop()
})
