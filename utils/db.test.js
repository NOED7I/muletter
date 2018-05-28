'use strict'

const test = require('ava')
const fs = require('fs')
const db = require('./db')

test.before(async () => {
  const { createKeys } = require('./helpers')
  await db.write('keys', createKeys())
})

test.serial('db/list.json creation', async t => {
  const { access } = fs.promises
  try {
    await db.open()
    await access(db.path('list'), fs.constants.F_OK)
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('add / del list item', async t => {
  const data = await db.open()
  data.add('thing')
  t.is(data.indexOf('thing'), 0)
  data.del(0)
  t.is(data.indexOf('thing'), -1)
})

test.serial('import / export list items', async t => {
  const { readFile } = fs.promises
  const data = await db.open()
  const expected = ['item-1', 'item-2', 'item-3']
  data.import(expected)
  t.deepEqual(data.export(), expected)
  try {
    const list = JSON.parse(await readFile(db.path('list')))
    t.deepEqual(list, expected)
  } catch (e) {
    t.fail(e)
  }
})

test.serial('get keys', async t => {
  const { readFile } = fs.promises
  const data = await db.open()
  const expected = data.keys()
  try {
    const keys = JSON.parse(await readFile(db.path('keys')))
    t.deepEqual(keys, expected)
  } catch (e) {
    t.fail(e)
  }
})

test.after(async () => {
  await db.drop()
})
