const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackConfigBase = require('./webpack.config.base')

module.exports = merge(webpackConfigBase, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  output: {
    path: path.resolve(__dirname, '../../dist/dev'),
    filename: 'js/[name]_[chunkhash:8].js',
    chunkFilename: 'chunk/[name]_[chunkhash:8].chunk.js',
    publicPath: '/'
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      BASE_NAME: '`/`'
    })
  ]
})