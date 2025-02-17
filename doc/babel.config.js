// babel-preset-taro 更多选项和默认值：
module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "spec": true,
        "modules": false,
        "targets": {
          "browsers": [
            "ie >= 9",
            "Chrome >= 21",
            "Firefox >= 1",
            "Edge >= 13",
            "last 3 versions"
          ]
        },
        "loose": false,
        "forceAllTransforms": true,
        "useBuiltIns": "entry",
        "corejs": "3.6"
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties"
  ]
}
