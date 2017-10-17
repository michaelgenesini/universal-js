require('babel-register')

import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

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

const universal = join(src, 'universal')
const server = join(src, 'server')

const serverInclude = [server, universal]

export default {
  context: src,
  entry: {
    prerender: './universal/routes/index.js'
  },
  target: 'node',
  output: {
    path: dist,
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js'],
    modules: [src, 'node_modules']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({compressor: { warnings: false } }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.DefinePlugin({
      '__CLIENT__': false,
      '__PRODUCTION__': true,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(png|j|jpeg|gif|svg|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      },

      {
        test: /\.css$/,
        include: serverInclude,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                root: src,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            }
          ]
        })
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: babelOptions,
        include: serverInclude
      }

    ]
  }
}