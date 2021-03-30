const router = require('koa-router')()
const RouterController = require('../controller/router_controller')
// router.prefix('/')

router.get('/addUser', RouterController.addUser)

module.exports = router
