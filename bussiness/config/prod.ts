import type { UserConfigExport } from "@tarojs/cli"
import path from 'path';

export default {
  env: {
    NODE_ENV: '"production"',
  },
  outputRoot: path.resolve(__dirname, '../dist/mini-modules-h5'), // 添加产物输出路径，根据平台环境变化
  terser: {
    enable: false,
  },
  plugins: [
    path.resolve(__dirname, './plugins/create-package-json.ts')
  ],
  h5: {
    compile: {
      include: [
        // 确保产物为 es5
        // filename => /node_modules\/(?!(@babel|core-js|style-loader|css-loader|react|react-dom))/.test(filename)
      ]
    },
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    webpackChain (chain, webpack) {}
  }
} satisfies UserConfigExport<'webpack5'>
