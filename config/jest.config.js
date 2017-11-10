const { babelOptions } = require('./config')

module.exports = {
  "transform": {
    "presets": ["react", "es2015", "stage-0"]
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(jsx|js)$",
}