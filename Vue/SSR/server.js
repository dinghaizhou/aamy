const server = require('express')()
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer(
    {
        template: require('fs').readFileSync('./index.template.html', 'utf-8')
    }
)

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })
    const context = {
        title: 'SSR',
        meta: `
          <meta charset="utf-8">
        `
    }
    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        console.log(html)
        res.end(html)
    })
})
server.listen(8081)

