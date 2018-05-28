'use strict'

const { writeFile, readFile, unlink } = require('fs').promises

const path = (type) => require('path').resolve(__dirname, `./../db/${type}${process.env.NODE_ENV === 'test' ? '.test' : ''}.json`)

const write = async (type, data) => {
  try {
    await writeFile(path(type), JSON.stringify(data))
  } catch (e) {
    throw e
  }
}

const open = async () => {
  // If keys not created the app will throw an error and exit
  let keys = JSON.parse(await readFile(path('keys')))

  let list = []
  try {
    list = JSON.parse(await readFile(path('list')))
  } catch (e) {
    await write('list', list)
  }

  return {
    add: (item) => {
      list.push(item)
      write('list', list)
    },
    del: (index) => {
      list.splice(index, 1)
      write('list', list)
    },
    indexOf: (item) => list.indexOf(item),
    import: async (items) => {
      list = items
      write('list', list)
    },
    export: () => list,
    keys: () => keys
  }
}

module.exports = {
  open,
  write,
  path,
  drop: async () => {
    await unlink(path('list'))
    await unlink(path('keys'))
  }
}
