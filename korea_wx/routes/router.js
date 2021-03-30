const router = require('koa-router')()
const RouterController = require('../controller/router_controller')
// router.prefix('/')

router.post('/addUser', RouterController.addUser)
router.post('/getArticleByType',RouterController.getArticleByType)
router.post('/getArticleByKeyWord',RouterController.getArticleByKeyWord)
router.post('/getCarousel',RouterController.getCarousel)
router.post('/getWordBookList',RouterController.getWordBookList)
router.post('/getWord',RouterController.getWord)


module.exports = router
