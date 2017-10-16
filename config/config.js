const { resolve } = require('path')

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
	babelOptions: {
		"presets": ["react", "es2015", "stage-0"],
		"plugins": [
			["transform-decorators-legacy"],
			["add-module-exports"]
		]
	}

}
