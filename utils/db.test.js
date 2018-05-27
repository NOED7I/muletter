'use strict'

const test = require('ava')
const db = require('./db')

test.serial('db/data.json creation', async t => {
  const fs = require('fs') 
  try {
    await db.open()
    fs.accessSync(require('path').resolve(__dirname, '../db/data.test.json'), fs.constants.F_OK)
  } catch (e) {
    t.fail(e) 
  }
  t.pass()
})

test.serial('add / del list item', async t => {
  const data = await db.open()
  data.add('thing')
  t.is(data.indexOf('thing'), 0)
  data.del(0)
  t.is(data.indexOf('thing'), -1)
})

test.serial('import / export list items', async t => {
  const fs = require('fs').promises
  const data = await db.open()
  const expected = ['item-1', 'item-2', 'item-3']
  data.import(expected)
  t.deepEqual(data.export(), expected)
  try {
    const {list} = JSON.parse(await fs.readFile(require('path').resolve(__dirname, '../db/data.test.json')))
    t.deepEqual(list, expected)
  } catch(e) {
    t.fail(e)
  }
})

test.serial('keys generating', async t => {
  const fs = require('fs').promises
  const data = await db.open()
  const expected = data.keys()
  try {
    const {keys} = JSON.parse(await fs.readFile(require('path').resolve(__dirname, '../db/data.test.json')))
    t.deepEqual(keys, expected)
  } catch(e) {
    t.fail(e)
  }
})