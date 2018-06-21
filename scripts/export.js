'use strict'

const URL = require('url').parse(process.env.URL)

const options = {
  ...URL,
  path: '/subscribers',
  headers: {
    'Authorization': `Basic ${process.env.PRIVATE_KEY}`
  }
}

require(URL.protocol.replace(':', '')).get(options, res => {
  let buffer = ''
  res.on('data', chunk => {
    buffer += chunk
  })
  res.on('end', () => {
    if (res.statusCode === 401) {
      throw new Error('Unauthorized Error : wrong PRIVATE_KEY')
    }
    console.log(JSON.parse(buffer).data)
  })
}).end()
