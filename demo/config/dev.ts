import type { UserConfigExport } from "@tarojs/cli"
import { OUTPUT_ROOT } from "./options/root"

export default {
  logger: {
    quiet: false,
    stats: true
  },

  outputRoot: OUTPUT_ROOT, // 添加产物输出路径，根据平台环境变化
  mini: {},
  h5: {}
} satisfies UserConfigExport<'webpack5'>
