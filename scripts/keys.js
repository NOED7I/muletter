'use strict'

const { createKeys } = require('../utils/helpers')
const keys = createKeys()

console.log(`PRIVATE_KEY : ${keys.private}\nPUBLIC_KEY : ${keys.public}`)
