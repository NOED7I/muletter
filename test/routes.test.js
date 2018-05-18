'use strict'

const test = require('ava')
const routes = require('../routes')
const { ConflictError, UnauthorizedError } = require('../errors')

const email = 'email@provider.com'
const wrongEmail = 'emailprovider.com'
const emails = 'email1@provider.com\nemail2@provider.com\nemail3@provider.com\nemail4@provider.com'

test('add', async t => {
  const body = { email: email }
  const expected = { data: email }
  await routes.add({ body }, 0, data => {
    t.deepEqual(data, expected)
  })
})

test('add - wrong email', async t => {
  const body = { email: wrongEmail }
  const expected = ConflictError('wrong email')
  await routes.add({ body }, 0, data => {
    t.deepEqual(data, expected)
  })
})

test('add - existing email', async t => {
  const body = { email: email }
  const expected = ConflictError('already exists')
  await routes.add({ body }, 0, data => {
    t.deepEqual(data, expected)
  })
})

test('remove - not authenticated', async t => {
  const body = { email: email }
  const expected = UnauthorizedError()
  await routes.remove({ body }, 0, data => {
    t.deepEqual(data, expected)
  })
})

test('remove - wrong email', async t => {
  const body = { email: wrongEmail }
  const expected = ConflictError('wrong email')
  await routes.remove({ body }, 1, data => {
    t.deepEqual(data, expected)
  })
})

test('remove - not found email', async t => {
  const body = { email: 'email@provider.me' }
  const expected = ConflictError('does not exist')
  await routes.remove({ body }, 1, data => {
    t.deepEqual(data, expected)
  })
})

test('remove', async t => {
  const body = { email: email }
  const expected = { data: email }
  await routes.remove({ body }, 1, data => {
    t.deepEqual(data, expected)
  })
})

test('import - not authenticated', async t => {
  const body = { data: emails }
  const expected = UnauthorizedError()
  await routes.import({ body }, 0, data => {
    t.deepEqual(data, expected)
  })
})

test('import - no data', async t => {
  const body = { data: '' }
  const expected = ConflictError('data to import is empty')
  await routes.import({ body }, 1, data => {
    t.deepEqual(data, expected)
  })
})

test('import - no cursor', async t => {
  const body = { data: emails }
  await routes.import({ body }, 1, ({ data }) => {
    if (data.includes(emails)) {
      t.pass()
    } else {
      t.fail()
    }
  })
})

test('import - negative cursor', async t => {
  const body = { data: emails, cursor: -5 }
  const expected = ConflictError('cursor must be a positive integer or equal to zero')
  await routes.import({ body }, 1, data => {
    t.deepEqual(data, expected)
  })
})

test('import - string cursor', async t => {
  const body = { data: emails, cursor: 'myCursor' }
  const expected = ConflictError('cursor must be a positive integer or equal to zero')
  await routes.import({ body }, 1, data => {
    t.deepEqual(data, expected)
  })
})

test('export - not authenticated', async t => {
  const expected = UnauthorizedError()
  await routes.export({}, 0, data => {
    t.deepEqual(data, expected)
  })
})

test('export', async t => {
  await routes.export({}, 1, ({ data }) => {
    if (data.includes(emails)) {
      t.pass()
    } else {
      t.fail()
    }
  })
})

test('import - cursor set to 0 - new list', async t => {
  const body = { data: emails, cursor: 0 }
  await routes.import({ body }, 1, ({ data }) => {
    if (data.includes(emails)) {
      t.pass()
    } else {
      t.fail()
    }
  })
})

test('export - new list after import cursor set to 0', async t => {
  const expected = { data: emails }
  await routes.export({}, 1, data => {
    t.deepEqual(data, expected)
  })
})

test('empty - not authenticated', async t => {
  const expected = UnauthorizedError()
  await routes.empty({}, 0, data => {
    t.deepEqual(data, expected)
  })
})

test('empty', async t => {
  const expected = { data: '' }
  await routes.empty({}, 1, data => {
    t.deepEqual(data, expected)
  })
})
