var async = require('async');

function handleResults(err, results) {
  if (err) {
    console.error('\x1b[91m', err.log, '\x1b[0m', err.res, '\t');
    process.exit(1);
  }
  else {
    results.forEach(function(r) {
      console.log('\x1b[92m✓\x1b[0m', '\x1b[90m', r.log, '\x1b[0m', r.res);
    });
    console.log('\t');
    this();
  }
}

async.series(process.argv.slice(2).map(function(test) {
  return function(cb) {
    var proc = require('./' + test + '.test');
    async.map(proc.tests, proc.task, handleResults.bind(cb));
  };
}), function() {
  console.log('\x1b[92m', 'All tests done without any error', '\x1b[0m', '\n');
  process.exit();
});
