const { babelOptions } = require('./config')

module.exports = require('babel-jest').createTransformer(babelOptions)