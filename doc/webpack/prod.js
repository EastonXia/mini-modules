
const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')

const webpackProdConf = require('./config/webpack.config.prod')

function printBuildError(err) {
  const message = err != null && err.message
  const stack = err != null && err.stack
  if (
    stack &&
    typeof message === 'string' &&
    message.indexOf('from UglifyJs') !== -1
  ) {
    try {
      const matched = /(.+)\[(.+):(.+),(.+)\]\[.+\]/.exec(stack)
      if (!matched) {
        throw new Error('Using errors for control flow is bad.')
      }
      const problemPath = matched[2]
      const line = matched[3]
      const column = matched[4]
      console.log(
        'Failed to minify the code from this file: \n\n',
        chalk.yellow(
          `\t${problemPath}:${line}${column !== '0' ? `:${column}` : ''}`
        ),
        '\n'
      )
    } catch (ignored) {
      console.log('Failed to minify the bundle.', err)
    }
  } else {
    console.log(`${message || err}\n`)
  }
  console.log()
}

const buildSpinner = ora('Starting build...').start()

const webpackCompiler = webpack(webpackProdConf)
webpackCompiler.run((err, stats) => {
  if (err) {
    return printBuildError(err)
  }

  process.stdout.write(`${stats.toString({
    colors: true, // 在控制台输出色彩信息
    modules: false, // 不显示每个模块的打包信息
    children: false, // 不显示子编译任务
    chunks: false, // 不显示每个代码块的信息
    chunkModules: true, // 显示代码块中模块的信息
    builtAt: true, // 打包时间
  })}\n`)

  buildSpinner.succeed(chalk.green('Compile successfully!\n'));
  
  // const { errors, warnings } = formatWebpackMessage(stats.toJson({}, true))
  // const isSuccess = !errors.length && !warnings.length
  // if (isSuccess) {
  //   buildSpinner.succeed(chalk.green('Compile successfully!\n'))
  //   process.stdout.write(
  //     `${stats.toString({
  //       colors: true,
  //       modules: false,
  //       children: false,
  //       chunks: false,
  //       chunkModules: false
  //     })}\n`
  //   )
  //   return
  // }
  // if (errors.length) {
  //   errors.splice(1)
  //   buildSpinner.fail(chalk.red('Compile failed!\n'))
  //   return printBuildError(new Error(errors.join('\n\n')))
  // }
  // if (warnings.length) {
  //   buildSpinner.warn(chalk.yellow('Compiled with warnings.\n'))
  //   console.log(warnings.join('\n\n'))
  // }
})
