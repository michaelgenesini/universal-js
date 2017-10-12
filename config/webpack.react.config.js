const webpack = require('webpack')
const Config = require('webpack-config').default

const { join } = require('path')

// Configuration
const {
	root,
	src,
	exclude,
	ppublic,
	dist
} = require('./config')

module.exports = new Config().extend({
	'config/webpack.default.config.js': config => {
		delete config.entry
		delete config.output
		delete config.devServer
		return config
	}
}).merge({
	context: src,
	entry: {
		app: [
			'babel-polyfill/dist/polyfill.js',
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?noInfo=false',
			'./client/index.js'
		]
	},
	output: {
		filename: 'app.js',
		chunkFilename: '[name]_[chunkhash].js',
		path: join(root, 'dist'),
		publicPath: '/static/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [{
					loader: 'babel-loader',
					options: {
						"presets": [
							"react",
							["es2015", { "modules": false }],
							"stage-0"
						],
						"plugins": [
							"transform-decorators-legacy",
							"react-hot-loader/babel"
						]
					}
				}],
				exclude: exclude
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'__CLIENT__': true,
			'__PRODUCTION__': false,
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
	]
})