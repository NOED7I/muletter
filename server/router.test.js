'use strict'

const test = require('ava')
const Router = require('./router')
const { NotFoundError, MethodNotAllowedError } = require('../utils/errors')

test('Unknown route', t => {
  Router({ method: 'POST', url: '/posts' }, data => {
    t.deepEqual(data, NotFoundError())
  })
})

test('Not Allowed Method', t => {
  Router({ method: 'UPDATE', url: '/add' }, data => {
    t.deepEqual(data, MethodNotAllowedError())
  })
})
