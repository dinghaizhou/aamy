const Koa = require('koa')
const app = new Koa()


app.use(async (ctx) => {
    ctx.body = 'hello koa2'
})

app.listen(4000)
console.log('project run at port 4000')