'use strict'

const test = require('ava')
const route = require('./index')
const { UnauthorizedError } = require('../utils/errors')
const { createKeys, getKeys } = require('../utils/helpers')
const db = require('../utils/db')
let data

test.before(async () => {
  const keys = createKeys()
  process.env.PUBLIC_KEY = keys.public
  process.env.PRIVATE_KEY = keys.private
  data = await db.open('subscribers.test')
})

test.serial('POST -- unauthorized', async t => {
  const body = { email: 'email@host.io' }
  const headers = {}
  const output = await route.POST({ body, headers }, 'subscribers.test')
  t.deepEqual(output, UnauthorizedError())
  setTimeout(() => {
    t.is(data.indexOf(body.email), -1)
  }, 100)
})

test.serial('POST -- wrong email', async t => {
  const body = { email: 'e' }
  const headers = {
    authorization: `Basic ${getKeys().public}`
  }
  const output = await route.POST({ body, headers }, 'subscribers.test')
  t.deepEqual(output, { data: body.email })
  setTimeout(() => {
    t.is(data.indexOf(body.email), -1)
  }, 100)
})

test.serial('POST - existing email', async t => {
  const body = { email: 'email@host.io' }
  const headers = {
    authorization: `Basic ${getKeys().public}`
  }
  const output = await route.POST({ body, headers }, 'subscribers.test')
  t.deepEqual(output, { data: body.email })
  setTimeout(() => {
    t.is(data.indexOf(body.email), 0)
  }, 100)
  const output2 = await route.POST({ body, headers }, 'subscribers.test')
  t.deepEqual(output2, { data: body.email })
  setTimeout(() => {
    t.is(data.indexOf(body.email), 0)
  }, 100)
})

test.serial('DELETE -- unauthorized', async t => {
  const body = { email: 'email@host.io' }
  const headers = {}
  const output = await route.DELETE({ body, headers }, 'subscribers.test')
  t.deepEqual(output, UnauthorizedError())
  setTimeout(() => {
    t.is(data.indexOf(body.email), 0)
  }, 100)
})

test.serial('DELETE -- wrong email', async t => {
  const body = { email: 'e' }
  const headers = {
    authorization: `Basic ${getKeys().public}`
  }
  const output = await route.DELETE({ body, headers }, 'subscribers.test')
  t.deepEqual(output, { data: body.email })
  setTimeout(() => {
    t.is(data.indexOf(body.email), -1)
  }, 100)
})

test.serial('DELETE - existing email', async t => {
  const body = { email: 'email@host.io' }
  const headers = {
    authorization: `Basic ${getKeys().public}`
  }
  await data.add(body.email)
  t.is(data.indexOf(body.email), 0)
  const output = await route.DELETE({ body, headers }, 'subscribers.test')
  t.deepEqual(output, { data: body.email })
  setTimeout(async () => {
    t.is(data.indexOf(body.email), -1)
  }, 100)
})

test.serial('GET -- unauthorized', async t => {
  const headers = {}
  const output = await route.GET({ headers }, 'subscribers.test')
  t.deepEqual(output, UnauthorizedError())
})

test.serial('GET', async t => {
  await data.add('email1@host.io')
  await data.add('email2@host.io')
  await data.add('email3@host.io')
  const headers = { authorization: `Basic ${getKeys().private}` }
  const output = await route.GET({ headers }, 'subscribers.test')
  t.deepEqual(output, { data: 'email@host.io\nemail1@host.io\nemail2@host.io\nemail3@host.io' })
})

test.after(async () => {
  await db.drop('subscribers.test')
})
