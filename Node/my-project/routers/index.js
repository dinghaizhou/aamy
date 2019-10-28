
const router = require('koa-router')()

const admin = require('./admin')
const api = require('./api')

router.use('/api', api.routes(), api.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())

module.exports = router