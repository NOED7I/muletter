'use strict'

const Router = require('../router')
const fs = require('fs')

console.log('> Test router.js')

process.env.datapath = './datatest.json'
if (fs.existsSync(process.env.datapath)) fs.unlinkSync(process.env.datapath)

module.exports.task = (test, cb) => {
  Router(test.req, test.auth, data => {
    let output = {req: `${test.req.url} ${test.txt}`, res: JSON.stringify(data)}
    if ((data.errors && !test.should) || (!data.errors && test.should)) {
      output.err = false
      cb(null, output)
    } else {
      output.err = true
      cb(null, output)
    }
  })
}

module.exports.tests = [
  {
    txt: 'Fake public url',
    should: false,
    auth: 1,
    req: {url: '/posts'}
  },
  {
    txt: 'Unsigned url',
    should: false,
    auth: 0,
    req: {url: '/export'}
  },
  {
    txt: 'Signed url',
    should: true,
    auth: 1,
    req: {url: '/export'}
  },
  {
    txt: 'Fake signed url',
    should: false,
    auth: 1,
    req: {url: '/delete'}
  }
]
