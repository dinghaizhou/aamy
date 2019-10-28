const koa =  require('koa')
const app = new koa()
const router = require('./routers')
const views = require('koa-views')
const path = require('path')




// 配置视图
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))


app.use(router.routes())

app.listen(3111)
console.log('project run on port 3111')