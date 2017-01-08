var Router = require('../router');

console.log('> Test router.js');

module.exports.task = function(test, cb) {
  Router(test.req, test.auth, function(data) {
    var output = {req: test.req.url + ' '+ test.txt, res: JSON.stringify(data)};
    if (data.errors && !test.should || !data.errors && test.should) {
      output.err = false;
      cb(null, output);
    }
    else {
      output.err = true;
      cb(null, output);
    }
  });
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
    req: {url: '/export'},
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
