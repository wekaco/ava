const nconf = require('nconf')

nconf
  .use('memory')
  .argv()
  .env({
    separator: '.',
    whitelist: [
      'port',
      //dont forget to update whitelist like `'mysql.connection'`
    ],
  })
  .file({
    file: `${__dirname}/default.yaml`,
    format: require('nconf-yaml'),
  })

module.exports = nconf.get()
