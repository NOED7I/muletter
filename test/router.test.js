'use strict'

const test = require('ava')
const Router = require('../router')

test('Unknown route', async t => {
  await Router({ url: '/posts' }, 1, data => {
    if (data.errors) {
      t.pass()
    } else {
      t.fail()
    }
  })
})

test('Index route', async t => {
  await Router({ url: '/' }, 0, data => {
    const expected = require('../index.js')
    t.true(typeof data === 'string')
    t.deepEqual(data, expected)
  })
})

test('Unsigned request', async t => {
  await Router({ url: '/export' }, 0, data => {
    if (data.errors) {
      t.pass()
    } else {
      t.fail()
    }
  })
})

test('Signed request', async t => {
  await Router({ url: '/export' }, 1, data => {
    if (!data.errors) {
      t.pass()
    } else {
      t.fail()
    }
  })
})
