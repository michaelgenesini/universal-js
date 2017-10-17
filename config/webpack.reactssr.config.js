const webpack = require('webpack')
const Config = require('webpack-config').default

import AssetsPlugin from 'assets-webpack-plugin'

const { join } = require('path')

// Configuration
const options = require('./config')

const {
	root,
	src,
	exclude,
	dist,
	babelOptions
} = options

const PROD = process.env.NODE_ENV === 'production'

// Cache vendor && client javascript on CDN...
const vendor = [
  'react',
  'react-dom',
  'react-router'
]

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
		],
		vendor
	},
	output: {
		filename: PROD ? '[name]_[chunkhash].js' : '[name].js',
		chunkFilename: PROD ? '[name]_[chunkhash].js' : '[name].js',
		path: dist,
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
					options: babelOptions
				}],
				exclude: exclude
			}
		]
	},
	plugins: [
		...(PROD ? [
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor'],
				minChunks: Infinity
			}),
			new AssetsPlugin({ path: options.public, filename: 'assets.json' })
		] : []),
		new webpack.optimize.MinChunkSizePlugin({ minChunkSize: PROD ? 5000 : 10 }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'__CLIENT__': true,
			'__PRODUCTION__': false,
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	devtool: PROD ? 'source-map' : 'cheap-module-source-map'
})