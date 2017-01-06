var Router = require('../router');

console.log('> Test router.js');

module.exports.task = function(test, cb) {
  Router(test.req, test.auth, function(data) {
    var output = {log: test.title, res: JSON.stringify(data)};
    if (data.errors && !test.should || !data.errors && test.should) {
      cb(null, output);
    }
    else {
      cb(output);
    }
  });
}

module.exports.tests = [
  {
    title: 'Fake public url : /logposts',
    should: false,
    auth: 1,
    req: {url: '/logposts'}
  },
  {
    title: 'Unsigned url : /export',
    should: false,
    auth: 0,
    req: {url: '/export'},
  },
  {
    title: 'Signed url : /export',
    should: true,
    auth: 1,
    req: {url: '/export'}
  },
  {
    title: 'Fake signed url : /delete',
    should: false,
    auth: 1,
    req: {url: '/delete'}
  } 
]
