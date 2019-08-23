const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    // 分离输出
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    //  添加资源loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                'style-loader',
                'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                'file-loader'
                ]
            }
        ]
    },
    // 插件
    // 安装HtmlWebpackPlugin插件 cnpm install --save-dev html-webpack-plugin
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
              title: 'Output Management'
        })
    ],
    
    devServer: {
        contentBase: 'dist'
    }
};