import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import path from 'path';
import fs from 'fs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import devConfig from './dev'
import prodConfig from './prod'


// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'mini-modules-h5',
    date: '2024-12-24',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    defineConstants: {},
    copy: {
      patterns: [{
        from: path.resolve(__dirname, '..', 'types/'),
        to: path.resolve(__dirname, '..', 'dist/mini-modules-h5/types/')
      }],
      options: {}
    },
    framework: 'react',
    compiler: 'webpack5',
    plugins: [],
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。
    },

    // h5 配置项
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'lib/[name].js',
        chunkFilename: 'lib/[name].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'style/[name].css',
        chunkFilename: 'style/[name].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },

      webpackChain(chain) {
        Object.keys(chain.entryPoints.entries()).forEach((key) => {
          if (key.startsWith("components")) {
            const p = key.split(path.sep);
            p.pop();
            const comStyle = path.resolve(__dirname, '../src/style' ,`${p.join("/")}.scss`); // 把样式文件也直接注入到输出文件中
            if (fs.existsSync(comStyle)) {
              chain.entry(key).prepend(comStyle);
            }
          }
        });
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.merge({
          output: {
            library: {
              name: '$miniModulesH5',
              type: 'commonjs2', // 指定输出为 CommonJS 格式
            },
            chunkLoadingGlobal: "$miniModulesH5_webpack" // 用于加载 chunk 的全局变量
          },
          optimization: {
            splitChunks: {
              chunks: 'all', // 对同步和异步模块都进行分割
              minSize: 1 * 1024, // 最小分割文件大小 (byte)
              cacheGroups: {
                minivendor: { // 第三方依赖库
                  test: /[\\/]node_modules[\\/]/, // 打包 node_module 中的文件
                  name: 'minivendor', // 模块名称
                  priority: 0, // 优先级，数字越大，优先级越高
                  enforce: true, // 强制执行
                  reuseExistingChunk: true, // 复用已有的公共 chunk
                },
                // common: { // 公共模块
                //   test: /[\\/]widgets|common[\\/]/, 
                //   name: 'common', // 模块名称
                //   minChunks: 2, // 被两处引用即被归为公共模块
                //   priority: 10, // 优先级
                //   reuseExistingChunk: true, // 复用已有的公共 chunk
                // }
              }
            },
            // 把 webpack 运行时代码打包到 runtime.js
            runtimeChunk: 'single', // 多个入口共享运行时文件
          },
        })
      }
    },
  }

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV

  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }

  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
