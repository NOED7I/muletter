'use strict'

const test = require('ava')
const fs = require('fs')
const db = require('./db')

test.serial('db/test.json creation', async t => {
  const { access } = fs.promises
  try {
    await db.open('test')
    await access(db.path('test'), fs.constants.F_OK)
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('add list item', async t => {
  const data = await db.open('test')
  data.add('thing')
  t.is(data.indexOf('thing'), 0)
})

test.serial('del list item', async t => {
  const data = await db.open('test')
  data.del(0)
  t.is(data.indexOf('thing'), -1)
})

test.serial('export list items', async t => {
  const { readFile } = fs.promises
  const data = await db.open('test')
  const expected = ['item-1', 'item-2', 'item-3']
  data.add('item-1')
  data.add('item-2')
  data.add('item-3')
  t.deepEqual(data.export(), expected)
  try {
    const list = JSON.parse(await readFile(db.path('test')))
    t.deepEqual(list, expected)
  } catch (e) {
    t.fail(e)
  }
})

test.after(async () => {
  await db.drop('test')
})
