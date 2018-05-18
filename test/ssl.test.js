'use strict'

const test = require('ava')
const fs = require('fs')
const ssl = require('../ssl')

test('create SSL Self-Signed certs', async t => {
  const { key, cert } = await ssl.selfSigned()
  t.deepEqual(key, fs.readFileSync('ssl.key', 'utf-8'))
  t.deepEqual(cert, fs.readFileSync('ssl.cert', 'utf-8'))
})

test('use trusted SSL Self-Signed certs', async t => {
  const selfSigned = await ssl.selfSigned()
  const trusted = await ssl.trusted('ssl.key', 'ssl.cert')
  t.deepEqual(trusted, selfSigned)
})
