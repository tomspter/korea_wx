module.exports = {
    dbOptions: {
        database : 'korea_learn',
        username : 'root',
        password : '123456',
        dialect: "mysql",
        host: "49.232.12.36",
        port: 3306,
        logging: false,
        define:{
            // underscored: false,
            // freezeTableName: false,
            timestamps: false
        }
    },
    options: {
        type: "js",
        dir: "models",
        emptyDir: true
    }
}
