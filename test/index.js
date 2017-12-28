'use strict'

const async = require('async')
const red = s => (`\x1b[38;5;01m${s}\x1b[0m`)
const green = s => (`\x1b[38;5;02m${s}\x1b[0m`)
const grey = s => (`\x1b[38;5;08m${s}\x1b[0m`)
const done = green('✓')
const fail = red('[FAIL]')

let errors = []

console.log('\t')

async.series(process.argv.slice(2).map(file => {
  return cb => {
    let serie = require(`./${file}.test`)
    async.map(serie.tests, serie.task, (err, results) => {
      if (err) {
        console.log(fail, err)
      }
      results.forEach(r => {
        if (r.err) {
          console.error(errors[errors.push(`${fail} ${red(r.req)} ${r.res}`) - 1])
        } else {
          console.log(done, grey(r.req), r.res)
        }
      })
      console.log('\t')
      cb()
    })
  }
}), () => {
  // if any test failed display them again but grouped
  const nbErrors = errors.length
  if (nbErrors > 0) {
    console.error(red(`Bellow the ${nbErrors} test(s) failed`), '\t')
    errors.forEach(function (e) {
      console.error(e)
    })

    console.log('\n')
    process.exit(1)
  }

  console.log(green('All tests done without any error'), '\n')
  process.exit()
})
