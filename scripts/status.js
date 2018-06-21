'use strict'

const URL = require('url').parse(process.env.URL)

const options = {
  ...URL,
  path: '/status',
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
    const data = JSON.parse(buffer)
    console.log(`Count : ${data.count}`)
    console.log(`PRIVATE_KEY : ${data.keys.private}`) 
    console.log(`PUBLIC_KEY : ${data.keys.public}`) 
    console.log(`Version : ${data.version}`)
  })
}).end()
