require('dotenv').config()

let sqlConfig = {
    server: process.env.DB_SERVER,
    user: process.env.DB_USERNAME,
    pwd: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
}

module.exports = {
    sqlConfig
}