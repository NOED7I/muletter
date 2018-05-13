'use strict'

let cursor
let data

const fs = require('fs')
const config = require('./config')
const errors = require('./errors')
const emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

const dataFileName = process.env.NODE_ENV === 'test' ? './test/data.test.json' : process.env.DATA_PATH || config.DATA_PATH || './data.json'

const initSchema = raw => {
  cursor = raw.cursor || 0
  data = raw.data || []
}

const writeFile = () => {
  fs.writeFile(dataFileName, JSON.stringify({cursor: cursor, data: data}), err => {
    if (err) console.error(`Error: ${err}`)
  })
}

// Open JSON data
try {
  initSchema(JSON.parse(fs.readFileSync(dataFileName)))
} catch (ex) {
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

module.exports.add = (req, auth, next) => {
  let email = req.body.email

  if (!email || (email && !emailRegExp.test(email))) {
    return next(errors.Conflict('wrong email'))
  }

  if (data.indexOf(email) !== -1) {
    return next(errors.Conflict('already exists'))
  }

  data.push(email)
  writeFile()

  next({data: email})
}

module.exports.remove = (req, auth, next) => {
  if (!auth) {
    return next(errors.Unauthorized())
  }

  let email = req.body.email
  let index

  if (!email || (email && !emailRegExp.test(email))) {
    return next(errors.Conflict('wrong email'))
  }

  index = data.indexOf(email)

  if (index === -1) {
    return next(errors.Conflict('does not exist'))
  }

  // Reajust cursor if higher than the index found
  if (index < cursor) {
    cursor -= 1
  }

  data.splice(index, 1)
  writeFile()

  next({data: email})
}

module.exports.import = (req, auth, next) => {
  if (!auth) {
    return next(errors.Unauthorized())
  }

  if (!req.body.data) {
    return next(errors.Conflict('data to import is empty'))
  }

  if (req.body.cursor !== undefined) {
    let newCursor = parseInt(req.body.cursor, 10)

    if (isNaN(newCursor) || newCursor < 0) {
      return next(errors.Conflict('cursor must be a positive integer or equal to zero'))
    }

    cursor = newCursor
  }

  data = data.slice(0, cursor)
  data = data.concat(req.body.data.split('\n'))
  cursor = 0
  writeFile()

  next({data: data.join('\n')})
}

module.exports.export = (req, auth, next) => {
  if (!auth) {
    return next(errors.Unauthorized())
  }

  cursor = data.length
  writeFile()

  next({data: data.join('\n')})
}

module.exports.empty = (req, auth, next) => {
  if (!auth) {
    return next(errors.Unauthorized())
  }

  cursor = 0
  data = []
  writeFile()

  next({data: ''})
}
