const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FaviconWebpackPlugin = require('favicons-webpack-plugin')

const webpackConfigBase = require('./webpack.config.base')

module.exports = merge(webpackConfigBase, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../dist/prod'),
    filename: 'js/[name]_[chunkhash:8].js',
    chunkFilename: 'chunk/[name]_[chunkhash:8].chunk.js',
    publicPath: '/'
  },
  resolve: {
    // mainFields: ['main']
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      // cleanOnceBeforeBuildPatterns: [
      //   `${path.resolve(projectRoot, conf.output)}/*`,
      //   `!${path.resolve(projectRoot, conf.output)}/lib/*`
      // ]
    }),
    new webpack.DefinePlugin({
      BASE_NAME: `'/taro-ui'`
    }),
    // new FaviconWebpackPlugin({
    //   logo: path.resolve(projectRoot, 'assets/favicon.png'),
    //   prefix: 'favicons/'
    // })
  ]
}) 