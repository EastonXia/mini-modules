const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackDevConf = require('./config/webpack.config.dev')

const protocol = 'http'
const host = '0.0.0.0'
const port = 8002
const urls = `${protocol}://${host}:${port}`;

const compiler = webpack(webpackDevConf)

const webpackDevServerConf = {
  host,
  port,
  open: true,
  compress: true,
  client: {
    logging: 'info',
    overlay: {
      errors: true,
      warnings: false,
    },
    reconnect: 6,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'X-Requested-with, content-type, Authorization',
  },
  liveReload: false,
}

const server = new WebpackDevServer(webpackDevServerConf, compiler)
server.startCallback(() => {
  console.log(`Successfully started server on ${urls}`);
})

server.stopCallback(() => {
  console.log('Server stopped.');
});