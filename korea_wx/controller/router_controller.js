const {Sequelize} = require("sequelize");
const sequelize = require('../utils/sequelize')
const axios = require("axios");
const {Op} = require("sequelize");
const wxUser = require('../models/wx_user')(sequelize, Sequelize);
const article = require('../models/article')(sequelize, Sequelize);
const carousel = require('../models/carousel')(sequelize, Sequelize);
const wordBook = require('../models/word_book')(sequelize, Sequelize);
const word = require('../models/word')(sequelize, Sequelize);

class RouterController {
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

    static async getArticleByType(ctx) {
        const {type} = {...ctx.request.body}
        let dbResult = await article.findAll({
            where: {
                type: type
            }
        })
        ctx.body = {
            code: 200,
            msg: dbResult
        }
    }

    static async getArticleByKeyWord(ctx) {
        const {keyword} = {...ctx.request.body}
        let dbResult = await article.findAll({raw: true})
        let result = dbResult.filter(item => {
            return item.main_text.includes(keyword)
        })
        ctx.body = {
            code: 200,
            msg: result
        }
    }

    static async getCarousel(ctx) {
        let dbResult = await carousel.findAll()
        ctx.body = {
            code: 200,
            msg: dbResult
        }
    }

    static async getWordBookList(ctx) {
        let dbResult = await wordBook.findAll()
        ctx.body = {
            code: 200,
            msg: dbResult
        }
    }

    static async getWord(ctx) {
        const {id} = {...ctx.request.body}
        let dbResult = await word.findAll({
            where: {
                word_book_id: id
            },
            raw: true
        })
        ctx.body = {
            code: 200,
            msg: dbResult[0]
        }
    }

    static async getWordNext(ctx) {

    }
}

module.exports = RouterController
