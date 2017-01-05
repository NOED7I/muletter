// Edit your parameters here
var https = true
var key 	= '1234'
var host 	= ''
var port 	= ''

// Do not edit this
module.exports = {
	https: https,
	key: key,
	host: process.env.HOST || process.env.OPENSHIFT_NODEJS_IP || host || '127.0.0.1',
	port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || port || (https? 443:80),
}
