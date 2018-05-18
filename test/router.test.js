'use strict'

const test = require('ava')
const Router = require('../router')
const { NotFoundError, MethodNotAllowedError } = require('../errors')

test('Unknown route', t => {
  Router({ method: 'POST', url: '/posts' }, 1, data => {
    t.deepEqual(data, NotFoundError())
  })
})

test('Index route', t => {
  Router({ url: '/' }, 0, data => {
    const expected = require('../index.js')
    t.true(typeof data === 'string')
    t.deepEqual(data, expected)
  })
})

test('Not Allowed Method', t => {
  Router({ method: 'UPDATE', url: '/add' }, 1, data => {
    t.deepEqual(data, MethodNotAllowedError())
  })
})
