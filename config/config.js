const { resolve } = require('path')
const babelConf = require('./babel.config.js')

module.exports = {

	root: resolve(__dirname, '..'),
	src: resolve(__dirname, '../src'),
	public: resolve(__dirname, '../public'),
	dist: resolve(__dirname, '../dist'),
	exclude: /node_modules/,
	browserList: [
		'>1%',
		'last 4 versions',
		'Firefox ESR',
		'not ie < 9'
	],
	babelOptions: babelConf
}
