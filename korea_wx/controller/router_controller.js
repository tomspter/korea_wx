const {Sequelize} = require("sequelize");
const sequelize = require('../utils/sequelize')
const axios = require("axios");
const {Op} = require("sequelize");
const youdao = require("../utils/youdao")
const naver = require("../utils/naver")
// const wxUser = require('../models/wx_user')(sequelize, Sequelize);
const article = require('../models/article')(sequelize, Sequelize);
const carousel = require('../models/carousel')(sequelize, Sequelize);
const wordBook = require('../models/word_book')(sequelize, Sequelize);
const word = require('../models/word')(sequelize, Sequelize);
const favorites = require('../models/favorites')(sequelize, Sequelize);


class RouterController {

    /**
     * 获取用户(已废弃)
     * @param ctx
     * @returns {Promise<void>}
     */
    static async addUser(ctx) {
        // await wxUser.create(ctx.request.body)
        const code = ctx.request.body.code
        const wxResult = await axios.get(
            "https://api.weixin.qq.com/sns/jscode2session?appid=wxb386eaca9554d001&secret=6fc4e6cda38fbb057f29b84198fd84db&js_code=" + code + "&grant_type=authorization_code"
        )
        console.log(wxResult.data)
        ctx.body = {
            code: 200,
            msg: wxResult.data
        }
    }

    /**
     * 根据文章类型获取文章(已废弃)
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getArticleByType(ctx) {
        const {type} = {...ctx.request.body}
        let dbResult = await article.findAll({
            where: {
                type: type
            }
        })
        ctx.body = {
            code: 200,
            msg: 'success',
            data: dbResult
        }
    }

    /**
     * 根据关键词获取文章(已废弃)
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getArticleByKeyWord(ctx) {
        const {keyword} = {...ctx.request.body}
        let dbResult = await article.findAll({raw: true})
        let result = dbResult.filter(item => {
            return item.main_text.includes(keyword)
        })
        ctx.body = {
            code: 200,
            msg: 'success',
            data: result
        }
    }

    /**
     * 获取横划图片URL
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getCarousel(ctx) {
        let dbResult = await carousel.findAll()
        ctx.body = {
            code: 200,
            msg: 'success',
            data: dbResult
        }
    }

    /**
     * 获取单词书列表
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getWordBookList(ctx) {
        let dbResult = await wordBook.findAll()
        ctx.body = {
            code: 200,
            msg: 'success',
            data: dbResult
        }
    }

    /**
     * 获取初始单词
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getWord(ctx) {
        const {bookId, index} = {...ctx.request.body}
        let dbResult = await word.findAll({
            where: {
                word_book_id: bookId
            },
            raw: true
        })
        let result = await youdao.getYouDao(dbResult[index].word)
        result.wordId = dbResult[index].id
        const isFavorites = await favorites.findOne({
            where: {
                word_book_id: bookId,
                word_id: dbResult[index].id
            }
        })
        result.isCollect = isFavorites !== null
        ctx.body = {
            code: 200,
            msg: 'success',
            data: result
        }
    }

    /**
     * 收藏单词
     * @param ctx
     * @returns {Promise<void>}
     */
    static async favoritesWord(ctx) {
        const {bookId, index} = {...ctx.request.body}
        await favorites.create({
            word_book_id: bookId,
            word_id: index
        })
        ctx.body = {
            code: 200,
            msg: 'success'
        }
    }

    /**
     * 获取已收藏单词列表
     * @param ctx
     * @returns {Promise<void>}
     */
    static async showFavorites(ctx) {
        const favoritesList = await favorites.findAll({attributes: ["word_id"], raw: true})
        let ids = favoritesList.map(item => item.word_id)
        const dbResult = await word.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            },
            raw: true
        })
        const search = await youdao.getYouDaoList(dbResult.map(item => item.word))
        const s = search.map(item => item.translation)
        ctx.body = {
            code: 200,
            msg: 'success',
            data: dbResult.map((item, index) => Object.assign(item, item, {'translation': s[index]}))
        }
    }

    /**
     * 删除收藏单词
     * @param ctx
     * @returns {Promise<void>}
     */
    static async delFavorites(ctx) {
        const {my_collect_id} = {...ctx.request.body}
        for (const item of JSON.parse(my_collect_id)) {
            await favorites.destroy({
                where: {
                    word_id: item.index,
                    word_book_id: item.bookId
                }
            })
        }
        ctx.body = {
            code: 200,
            msg: 'success'
        }
    }

    /**
     * 有道单词查找
     * @param ctx
     * @returns {Promise<void>}
     */
    static async searchWord(ctx) {
        const {word} = {...ctx.request.body}
        const data = await youdao.getYouDao(word)
        ctx.body = {
            code: 200,
            msg: 'success',
            data: data
        }
    }

    static async getNaver(ctx) {
        const result = await naver({...ctx.request.body})
        ctx.body = {
            code: 200,
            msg: "success",
            data: result.data
        }
    }
}


module.exports = RouterController
