'use strict'

const test = require('ava')
const { isEmail, checkAuthKey, createKeys } = require('./helpers')

test('isEmail', t => {
  t.is(isEmail('email@provider.io'), true)
  t.is(isEmail('emailprovider'), false)
  t.is(isEmail('email@provider.c'), false)  
})

test('checkAuthKey', t => {
  const req = {
    headers: {
      authorization: 'Basic 123'
    } 
  }

  const keys = {
    public: '123',
    private: '456'
  }

  t.true(checkAuthKey(req, keys, 'public'))
  t.false(checkAuthKey(req, keys, 'private'))
  
  req.headers.authorization = 'OAuth 123'
  t.false(checkAuthKey(req, keys, 'public'))
  
  req.headers.authorization = 'Basic 42'
  t.false(checkAuthKey(req, keys, 'public'))
})

test('createKeys', t => {
  const randomKey = require('crypto').randomBytes(20).toString('base64')
  const keys = createKeys()
  t.true(typeof keys.public === 'string')
  t.true(typeof keys.private === 'string')
  t.true(keys.public.length === randomKey.length)
  t.true(keys.private.length === randomKey.length)
})