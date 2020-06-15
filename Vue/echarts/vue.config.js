// vue.config.js
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const PrerenderSPAPlugin = require('prerender-spa-plugin')

const Renderer =PrerenderSPAPlugin.PuppeteerRenderer

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
    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json', ".css"],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
            }
        }
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    // 预渲染配置
                    new PrerenderSPAPlugin({
                        //要求-给的WebPack-输出应用程序的路径预渲染。
                        staticDir: path.join(__dirname, 'dist'),
                        //必需，要渲染的路线。
                        routes: ['/','/wordcloud'],
                        //必须，要使用的实际渲染器，没有则不能预编译
                        renderer: new Renderer({
                            inject: {
                                foo: 'bar'
                            },
                            headless: false, //渲染时显示浏览器窗口。对调试很有用。  
                            //等待渲染，直到检测到指定元素。
                            //例如，在项目入口使用`document.dispatchEvent(new Event('custom-render-trigger'))` 
                            renderAfterDocumentEvent: 'render-event'
                        })
                    })
                ],
            }
        } else {
            return ;
        }
    },
}
