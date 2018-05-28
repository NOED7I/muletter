'use strict'

const test = require('ava')
const db = require('../utils/db')
const sender = require('./index')
const { UnauthorizedError, ConflictError } = require('../utils/errors')

test.before(async () => {
  const { createKeys } = require('../utils/helpers')
  await db.write('keys', createKeys())
})

test.serial('POST -- unauthorized', async t => {
  const data = await db.open()
  const headers = {
    authorization: `Basic ${data.keys().public}`
  }
  const output = await sender.POST({ headers })
  t.deepEqual(output, UnauthorizedError())
})

test.serial('POST -- empty / wrong user', async t => {
  const data = await db.open()
  const headers = {
    authorization: `Basic ${data.keys().private}`
  }
  const body = {
    service: 'hostname',
    user: '',
    password: 'password',
    subject: 'subject',
    body: 'body'
  }
  const output = await sender.POST({ headers, body })
  t.deepEqual(output, ConflictError('Wrong user'))
})

test.serial('POST -- empty password', async t => {
  const data = await db.open()
  const headers = {
    authorization: `Basic ${data.keys().private}`
  }
  const body = {
    service: 'hostname',
    user: 'user@hostname.io',
    password: '',
    subject: 'subject',
    body: 'body'
  }
  const output = await sender.POST({ headers, body })
  t.deepEqual(output, ConflictError('Empty password'))
})

test.serial('POST -- empty service', async t => {
  const data = await db.open()
  const headers = {
    authorization: `Basic ${data.keys().private}`
  }
  const body = {
    service: '',
    user: 'user@hostname.io',
    password: 'password',
    subject: 'subject',
    body: 'body'
  }
  const output = await sender.POST({ headers, body })
  t.deepEqual(output, ConflictError('Empty service'))
})

test.serial('POST -- empty subject', async t => {
  const data = await db.open()
  const headers = {
    authorization: `Basic ${data.keys().private}`
  }
  const body = {
    service: 'hostname',
    user: 'email@hostname.io',
    password: 'password',
    subject: '',
    body: 'body'
  }
  const output = await sender.POST({ headers, body })
  t.deepEqual(output, ConflictError('Empty subject'))
})

test.serial('POST -- empty body', async t => {
  const data = await db.open()
  const headers = {
    authorization: `Basic ${data.keys().private}`
  }
  const body = {
    service: 'hostname',
    user: 'email@hostname.io',
    password: 'password',
    subject: 'subject'
  }
  const output = await sender.POST({ headers, body })
  t.deepEqual(output, ConflictError('Empty body'))
})

test.after(async () => {
  await db.drop()
})
