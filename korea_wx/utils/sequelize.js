const Sequelize = require('sequelize')
const config = require('../conf')

const sequelize = new Sequelize(config.database,
    config.username, config.password, {
        host: config.host,
        port: config.port,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
        },
        define: {
            timestamps: false
        }

    })
module.exports = sequelize
