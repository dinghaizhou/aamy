## 起步
### 局部安装
npm install webpack webpack-cli --save-dev
### 打包命令
1. webpack（局部安装 ./node_modules/.bin/webpack） --mode production ./app.js -o ./bundle.js
2. package.json中配置,  scripts: {"build": "webpack"},  npm run build

## 概念
### 入口（entry）
### 出口 (output)
    const path = require('path');
    module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
        }
    };
### loader
#### 作用： 打包非js资源，test 和 use 属性
    const config = {
        module: {
            rules: [
            { test: /\.txt$/, use: 'raw-loader' }
            ]
        }
    };

### 插件(plugins)
#### 作用： 插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。
#### webpack 插件是一个具有 apply 属性的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。
    const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
    const webpack = require('webpack'); // 用于访问内置插件
    const config = {
        module: {
            rules: [
            { test: /\.txt$/, use: 'raw-loader' }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({template: './src/index.html'})
        ]
    };
### 模式
#### 通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化
    module.exports = {
        mode: 'production'
    };