import path, { dirname } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import RollupJson from '@rollup/plugin-json'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from 'rollup-plugin-typescript2'
import RollupCopy from 'rollup-plugin-copy'

const packagejson = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf-8")
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolveFile = (file) => path.resolve(__dirname, '..', file).split(path.sep).join('/')

const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react'
]

export default {
  input: resolveFile('src/index.ts'),
  output: [
    {
      file: resolveFile('dist/mini-modules-mini/index.js'),
      format: 'cjs',
      // sourcemap: true
    },
    {
      file: resolveFile('dist/mini-modules-mini/index.esm.js'),
      format: 'es',
      // sourcemap: true
    }
  ],
  external: externalPackages,
  plugins: [
    RollupNodeResolve({
      // customResolveOptions: {
      //   moduleDirectory: 'node_modules'
      // }
    }),
    RollupCommonjs({
      // include: /\/node_modules\//,
      extensions: [".js", ".ts"],
    }),
    RollupJson(),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json')
    }),
    RollupCopy({
      targets: [
        {
          src: resolveFile('src/style'),
          dest: resolveFile('dist/mini-modules-mini')
        },{
          src: resolveFile('types'),
          dest: resolveFile('dist/mini-modules-mini')
        }
      ]
    }),
    {
      name: "clean",
      async buildStart() {
        return fs.rmdir(resolveFile('dist/mini-moduels-mini'),() => {});
      },
    },
    {
      name: "writePackageJson",
      async closeBundle() {
        Object.assign(packagejson, {
          name: 'mini-modules-mini',
          // types: "./components/index.d.ts",
          // files: ["components", "assets", "style", 'index.esm.js'],
          // module: "index.esm.js",
          // main: "index.js",
        });
        return fs.writeFile(
          // path.resolve(MINI_PROJECT, "package.json"), 
          resolveFile('dist/mini-modules-mini/package.json'),
          JSON.stringify(packagejson, null, 2) + "\n",
          (err) => {
            if (err) {
              console.log(err)
              throw err;
            }
          }
        );
      },
    },
  ]
}