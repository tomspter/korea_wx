const {Sequelize} = require("sequelize");
const sequelize = require('../utils/sequelize')
const wxUser = require('../models/wx_user')(sequelize, Sequelize);

class RouterController {
    static async addUser(ctx) {
        await wxUser.create(ctx.request.body)
        ctx.body = {
            code: 200,
            msg: 'success'
        }
    }
}

module.exports = RouterController
