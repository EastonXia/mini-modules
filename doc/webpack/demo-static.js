const fs = require('fs-extra')
const path = require('path')

const env = process.env._ENV || 'prod'

const distPath = env === 'dev' ?  path.resolve(__dirname, '../dist/dev/') : path.resolve(__dirname, '../dist/prod/')

// 合并 demo 的 h5 产物和 doc 的产物
function mergeDemoH5AndDist() {
  const demoH5Path = path.resolve(__dirname, '../../demo/dist/h5/') // demo h5
  if (!fs.existsSync(demoH5Path)) {
    console.log('Please run `npm run build:demo` first')
    spinner.stop()
    return
  }

  fs.emptyDirSync(path.resolve(distPath, './h5')) // 清理 doc/dist/env/h5
  fs.cp(
    path.resolve(demoH5Path), 
    path.resolve(distPath, './h5'), 
    {recursive: true}, 
    function callback(err) {
      if (err) throw err;
      console.log('copyFile was copied');
    }
  )
}

mergeDemoH5AndDist()