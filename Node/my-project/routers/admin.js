
const router = require('koa-router')()

router
    .get('/', async (ctx, next) => {
        await ctx.render('index', {title: "我的koa"})
    })
    .get('/login', (ctx, next) => {
        ctx.body = '1111'
    })

module.exports = router