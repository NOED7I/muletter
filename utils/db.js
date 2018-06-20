'use strict'

const { writeFile, readFile, unlink } = require('fs').promises

const path = (name) => require('path').resolve(__dirname, `./../db/${name}.json`)

const write = async (name, data) => {
  try {
    await writeFile(path(name), JSON.stringify(data))
  } catch (e) {
    throw e
  }
}

const open = async (name) => {
  let list = []
  try {
    list = JSON.parse(await readFile(path(name)))
  } catch (e) {
    await write(name, list)
  }

  return {
    add: (item) => {
      list.push(item)
      write(name, list)
    },
    del: (index) => {
      list.splice(index, 1)
      write(name, list)
    },
    indexOf: (item) => list.indexOf(item),
    export: () => list
  }
}

module.exports = {
  open,
  write,
  path,
  drop: async (name) => {
    await unlink(path(name))
  }
}
