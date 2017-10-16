// Import babelOptions (instead of .babelrc) so we can have just one configuration file
const { babelOptions } = require('../../config/config.js')

// All subsequent files required by node with the extensions .es6, .es, .jsx and .js will be transformed by Babel.
require('babel-register')(babelOptions)

// Server Driver Code, everything from here on can use all the super future ES6 features!
module.exports = require('./server.js')