const babelConf = require('./config/babel.config')
module.exports = require('babel-jest').createTransformer({
    presets: babelConf.presets
  });