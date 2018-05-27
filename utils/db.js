'use strict'

const { createKeys } = require('./helpers')

const { writeFile, readFile, unlink } = require('fs').promises

const path = require('path').resolve(__dirname, `./../db/data${process.env.NODE_ENV === 'test' ? '.test' : ''}.json`)

const write = async (data) =>  {
  try {
    await writeFile(path, JSON.stringify(data))
  } catch (e) {
    throw e
  }
}

const open = async () => {
  let data
  try {
    data = JSON.parse(await readFile(path))
  } catch (e) {
    data = {
      keys: createKeys(),
      list: []
    }
    await write(data)
  } 

  let { keys, list } = data
  
  return {
    add: (item) => {
      list.push(item)
      write({ keys, list })
    },
    del: (index) => {
      list.splice(index, 1)
      write({ keys, list })
    },
    indexOf: (item) => list.indexOf(item),
    import: async (items) => {
      list = items
      write({ keys, list })
    },
    export: () => list,
    keys: (status = '') =>  {
      if (status === 'new') {
        keys = createKeys()
        write({ keys, list })
      }
      return keys
    }
  }
}
    
// Trigger all events when testing
if (process.env.NODE_ENV === 'test') {
  process.on('SIGINT', () => { process.exit() })
  process.on('SIGILL', () => { process.exit() })
  process.on('SIGHUP', () => { process.exit() })
  process.on('SIGBREAK', () => { process.exit() })
  process.on('exit', async () => {
    try {
      await unlink(path)
    } catch (e) {
      throw e
    }
  })
}

module.exports = {
  open,
  write
}