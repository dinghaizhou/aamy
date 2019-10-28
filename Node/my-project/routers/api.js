const router = require('koa-router')()

router.get('/login', (ctx, next) => {
    ctx.body = '12222'
})

module.exports = router