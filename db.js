const mssql = require('mssql')
const { sqlConfig } = require('./services/config/base')

let connection = async () => {
    try {
        let config = {
            user: sqlConfig.user,
            password: sqlConfig.pwd,
            database: sqlConfig.dbName,
            server: sqlConfig.server,
            options: {
                trustServerCertificate: true
            }
        }

        let pool = await mssql.connect(config)
        console.log(`Connect to sql successfully...........`)
        return pool
    } catch (err) {
        console.log(`Connect fail! ${err}`)
        return err
    }
}

module.exports = {
    connection
}