'use strict'

let cursor
let data

const fs = require('fs')
const config = require('./config')
const { ConflictError, UnauthorizedError } = require('./errors')
const emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

const dataFileName = process.env.NODE_ENV === 'test' ? './test/data.test.json' : process.env.DATA_PATH || config.DATA_PATH || './data.json'

const initSchema = raw => {
  cursor = raw.cursor || 0
  data = raw.data || []
}

const writeFile = () => {
  fs.writeFile(dataFileName, JSON.stringify({ cursor, data }), err => err && console.error(`Error: ${err}`))
}

// Open JSON data
try {
  initSchema(JSON.parse(fs.readFileSync(dataFileName)))
} catch (e) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`> First start: create ${dataFileName}`, '\n')
  }
  initSchema({})
  writeFile()
}

// Trigger all events when testing
if (process.env.NODE_ENV === 'test') {
  process.on('SIGINT', () => { process.exit() })
  process.on('SIGILL', () => { process.exit() })
  process.on('SIGHUP', () => { process.exit() })
  process.on('SIGBREAK', () => { process.exit() })
  process.on('exit', () => {
    if (fs.existsSync('./test/data.test.json')) {
      fs.unlinkSync('./test/data.test.json')
    }
  })
}

module.exports = {
  add: (req, auth, next) => {
    let email = req.body.email

    if (!email || (email && !emailRegExp.test(email))) {
      return next(ConflictError('Wrong Email'))
    }

    if (data.indexOf(email) !== -1) {
      return next(ConflictError('Existing Email'))
    }

    data.push(email)
    writeFile()

    next({data: email})
  },

  remove: (req, auth, next) => {
    if (!auth) {
      return next(UnauthorizedError())
    }

    let email = req.body.email
    let index

    if (!email || (email && !emailRegExp.test(email))) {
      return next(ConflictError('Wrong Email'))
    }

    index = data.indexOf(email)

    if (index === -1) {
      return next(ConflictError('Nonexistent Email'))
    }

    // Reajust cursor if higher than the index found
    if (index < cursor) {
      cursor -= 1
    }

    data.splice(index, 1)
    writeFile()

    next({data: email})
  },

  import: (req, auth, next) => {
    if (!auth) {
      return next(UnauthorizedError())
    }

    if (!req.body.data) {
      return next(ConflictError('Empty Data'))
    }

    if (req.body.cursor !== undefined) {
      let newCursor = parseInt(req.body.cursor, 10)

      if (isNaN(newCursor) || newCursor < 0) {
        return next(ConflictError('Wrong Cursor'))
      }

      cursor = newCursor
    }

    data = data.slice(0, cursor)
    data = data.concat(req.body.data.split('\n'))
    cursor = 0
    writeFile()

    next({data: data.join('\n')})
  },

  export: (req, auth, next) => {
    if (!auth) {
      return next(UnauthorizedError())
    }

    cursor = data.length
    writeFile()

    next({data: data.join('\n')})
  },

  empty: (req, auth, next) => {
    if (!auth) {
      return next(UnauthorizedError())
    }

    cursor = 0
    data = []
    writeFile()

    next({data: ''})
  }
}
