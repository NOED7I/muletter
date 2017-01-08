'use strict';

var async = require('async');
var red   = function(s) { return '\x1b[38;5;01m'+s+'\x1b[0m' };
var green = function(s) { return '\x1b[38;5;02m'+s+'\x1b[0m' };
var grey  = function(s) { return '\x1b[38;5;08m'+s+'\x1b[0m' };
var done  = green('✓');
var fail  = red('[FAIL]');
var errors = [];

function handleResults(err, results) {
  results.forEach(function(r) {
    if (r.err) {
      console.error(errors[errors.push(fail + ' ' + red(r.req) + ' ' + r.res)-1])
    }
    else {
      console.log(done, grey(r.req), r.res)
    }
  });
  console.log('\t');
  this();
}

console.log('\t');

async.series(process.argv.slice(2).map(function(test) {
  return function(cb) {
    var proc = require('./' + test + '.test');
    async.map(proc.tests, proc.task, handleResults.bind(cb));
  };
}), function() {
  // if any test failed display them again but grouped
  var nbErrors = errors.length;  
  if (nbErrors > 0) {
    console.error(red('Bellow ' + nbErrors + ' test(s) failed'), '\t');
    errors.forEach(function(e) {
      console.error(e)
    });

    console.log('\n');
    process.exit(1);  
  }
  
  console.log(green('All tests done without any error'), '\n');
  process.exit();
});

