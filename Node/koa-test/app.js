const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const jsonp = require('koa-jsonp')
const logger = require('./middleware/log')

app.use(logger())

// 使用中间件
app.use(jsonp())

app.use( async ( ctx ) => {

  let returnData = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().getTime(),
    }
  }

  // 直接输出JSON
  ctx.body = returnData
})
   


app.listen(4000)
console.log('project run at port 4000')