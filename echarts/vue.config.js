// vue.config.js
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // 选项...
    publicPath: './',

    devServer: {
        host: '0.0.0.0',
        proxy: {
            '^/api': {
                target: 'http://tcrms.com/', 
                changeOrigin: true,
                autoRewrite: true,
                cookieDomainRewrite: true,
                // pathRewrite: {
                //     '^/api': ''
                // }
             }
        }
    },
    lintOnSave: false,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@src', resolve('src'))
    }
}
