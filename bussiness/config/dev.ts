import type { UserConfigExport } from "@tarojs/cli"
import path from 'path';

export default {
  env: {
    NODE_ENV: '"development"',
  },
  logger: {
    quiet: false,
    stats: true
  },
  outputRoot: path.resolve(__dirname, '../dist/mini-modules-h5'), // 添加产物输出路径，根据平台环境变化
  h5: {}
} satisfies UserConfigExport<'webpack5'>
