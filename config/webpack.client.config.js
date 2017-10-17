import webpack from 'webpack'
import { join } from 'path'

import autoprefixer from 'autoprefixer'
import AssetsPlugin from 'assets-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

// Configuration
const options = require('./config')

const {
	root,
	src,
	exclude,
	dist,
	babelOptions
} = options

const clientSrc = join(src, 'client')
const universalSrc = join(src, 'universal')

const clientInclude = [clientSrc, universalSrc]

// Cache vendor && client javascript on CDN...
const vendor = [
  'react',
  'react-dom',
  'react-router'
]

export default {
  context: src,
  entry: {
    app: [
      'babel-polyfill/dist/polyfill.js',
      './client/index.js'
    ],
    vendor
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    path: dist,
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js'],
    modules: [src, 'node_modules'],
    unsafeCache: true,
    alias: {
      '@': src
    }
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  plugins: [
   new webpack.NamedModulesPlugin(),
   new ExtractTextPlugin('[name].css'),
   new webpack.NormalModuleReplacementPlugin(/\.\.\/routes\/static/, '../routes/async'),
   new webpack.optimize.CommonsChunkPlugin({
     names: ['vendor', 'manifest'],
     minChunks: Infinity
   }),
   new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: process.env.production ? 5000 : 10 }),
   new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}, comments: /(?:)/}),
   new AssetsPlugin({path: dist, filename: 'assets.json'}),
   new webpack.NoEmitOnErrorsPlugin(),
   new webpack.DefinePlugin({
     '__CLIENT__': true,
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

     // JavaScript
     {
       test: /\.js$/,
       loader: 'babel-loader',
       options: babelOptions,
       include: clientInclude
     },

     // CSS
     {
       test: /\.css|less$/,
      include: clientInclude,
      loaders: ExtractTextPlugin.extract({
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
     }

   ]
 }
}