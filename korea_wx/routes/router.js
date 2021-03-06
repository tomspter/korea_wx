const router = require('koa-router')()
const RouterController = require('../controller/router_controller')

router.post('/addUser', RouterController.addUser)
router.post('/getCarousel',RouterController.getCarousel)
router.post('/getWordBookList',RouterController.getWordBookList)
router.post('/getWord',RouterController.getWord)
router.post('/favoritesWord',RouterController.favoritesWord)
router.post('/showFavorites',RouterController.showFavorites)
router.post('/delFavorites',RouterController.delFavorites)
router.post('/searchWord',RouterController.searchWord)
router.post('/getNaver',RouterController.getNaver)
router.post('/saveUser',RouterController.saveUser)
router.post('/getUserInfo',RouterController.getUserInfo)


module.exports = router
