module.exports = {
	port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
	host: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  title: 'MuList',
}
