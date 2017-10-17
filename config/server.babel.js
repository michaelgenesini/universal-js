require('dotenv').config()

// Import babelOptions (instead of .babelrc) so we can have just one configuration file
const { babelOptions } = require('./config.js')

// All subsequent files required by node with the extensions .es6, .es, .jsx and .js will be transformed by Babel.
require('babel-register')(babelOptions)

module.exports = require('./webpack.server.config.js')