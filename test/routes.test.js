var routes = require('../routes'), errors = require('../errors'), fs = require('fs'), path = require('path');

console.log('> Test routes.js');

fs.unlink(path.resolve(__dirname, '../data.json'));

module.exports.task = function(test, cb) {
  routes[test.route](test.body, test.auth, function(data) {
    var output = {req: '/' + test.route + ' ' + test.txt, res: JSON.stringify(data)};

    if (data.data && (data.data != test.should.data) || data.code && (data.code != test.should.code && data.message != test.should.message)) {
      output.err = true;
      cb(null, output);
    }
    else {
      output.err = false;
      cb(null, output);
    }
  });
}

module.exports.tests = [
  {
    route: 'add',
    auth: false,
    txt: '[email@provider] it should return that the email is wrong',
    body: {body:{email: 'email@provider'}},
    should: errors.Conflict('wrong email')
  },
  {
    route: 'add',
    auth: false,
    txt: '[email@provider.com] it should return the email as a successfull request',
    body: {body:{email: 'email@provider.com'}},
    should: {data: 'email@provider.com'}
  },
  {
    route: 'add',
    auth: false,
    txt: '[email@provider.com] it should return that the email already exists',
    body: {body:{email: 'email@provider.com'}},
    should: errors.Conflict('already exists')
  },
  {
    route: 'remove',
    auth: false,
    txt: '[not authenticated] it should return that the request is unauthorized',
    body: {body:{email: 'email@provider.com'}},
    should: errors.Unauthorized()
  },
  {
    route: 'remove',
    auth: true,
    txt: '[emailprovider.com] it should return that the email is wrong',
    body: {body:{email: 'emailprovider.com'}},
    should: errors.Conflict('wrong email')
  },
  {
    route: 'remove',
    auth: true,
    txt: '[email@provider.me] it should return that the email does not exist',
    body: {body:{email: 'email@provider.me'}},
    should: errors.Conflict('does not exist')
  },
  {
    route: 'remove',
    auth: true,
    txt: '[email@provider.com] it should return the email as a successfull request',
    body: {body:{email: 'email@provider.com'}},
    should: {data: 'email@provider.com'}
  },
  {
    route: 'import',
    auth: false,
    txt: '[not authenticated] it should return that the request is unauthorized',
    body: {body:{data: 'email1@gmx.com\nemail2@gmx.com\nemail3@gmx.com\nemail4@gmx.com'}},
    should: errors.Unauthorized()
  },
  {
    route: 'import',
    auth: true,
    txt: '[no data] it should return that the list to import is empty',
    body: {body:{data: ''}},
    should: errors.Conflict('data to import is empty')
  },
  {
    route: 'import',
    auth: true,
    txt: '[email-list] it should return the email list as a successfull request',
    body: {body:{data: 'email1@gmx.com\nemail2@gmx.com\nemail3@gmx.com\nemail4@gmx.com'}},
    should: {data: 'email1@gmx.com\nemail2@gmx.com\nemail3@gmx.com\nemail4@gmx.com'}
  },
  {
    route: 'import',
    auth: true,
    txt: '[negative cursor] it should return that the cursor must be a positive integer or equal to zero',
    body: {body:{cursor: -5, data: 'inserted@cursor.com'}},
    should: errors.Conflict('cursor must be a positive integer or equal to zero')
  },
  {
    route: 'import',
    auth: true,
    txt: '[string cursor] it should return that the cursor must be a positive integer or equal to zero',
    body: {body:{cursor: 'mystring', data: 'inserted@cursor.com'}},
    should: errors.Conflict('cursor must be a positive integer or equal to zero')
  },
  {
    route: 'import',
    auth: true,
    txt: '[no cursor] it should return the list with the email inserted@cursor.com at the last position',
    body: {body:{data: 'inserted@cursor.com'}},
    should: {data: 'email1@gmx.com\nemail2@gmx.com\nemail3@gmx.com\nemail4@gmx.com\ninserted@cursor.com'}
  },
  {
    route: 'export',
    auth: false,
    txt: '[not authenticated] it should return that the request is unauthorized',
    body: {},
    should: errors.Unauthorized()
  },
  {
    route: 'export',
    auth: true,
    txt: '[authenticated] it should return the list',
    body: {},
    should: {data: 'email1@gmx.com\nemail2@gmx.com\nemail3@gmx.com\nemail4@gmx.com\ninserted@cursor.com'}
  },
  {
    route: 'import',
    auth: true,
    txt: '[new email-list, cursor set to 0] it should return the new list and keep the old one exported',
    body: {body:{cursor: 0, data: 'email@provider.com\nemail2@provider.com\nemail3@provider.com\nemail4@provider.com'}},
    should: {data: 'email1@gmx.com\nemail2@gmx.com\nemail3@gmx.com\nemail4@gmx.com\ninserted@cursor.com\nemail@provider.com\nemail2@provider.com\nemail3@provider.com\nemail4@provider.com'}
  },
  {
    route: 'empty',
    auth: false,
    txt: '[not authenticated] it should return that the request is unauthorized',
    body: {},
    should: errors.Unauthorized()
  },
  {
    route: 'empty',
    auth: true,
    txt: '[authenticated] it should return an empty list',
    body: {},
    should: {data: ""}
  },
];
