const { connection } = require('../../../db')
const bcrypt = require('bcrypt')
let addStaff = async (req, res) => {
    let { staffName, gender, phone, salary, positionID } = req.body
    if (staffName && gender && phone && salary && positionID) {
        try {
            let staffID = `${Math.floor(Math.random() * (99999 - 1 + 1)) + 1}`
            let pool = await connection()
            let check = await pool.request().input('staffID', staffID).execute('getStaffByID')
            if (!check.recordset.length) {
                //@staffID varchar(100), 
                //@staffName varchar(100) , 
                //@gender varchar(10), 
                //@phone varchar(20), 
                //@salary float,
                //@positionID varchar(100),
                //@pwd varchar(1000)
                let salt = 10
                let hashPwd = bcrypt.hashSync('123456', salt)
                await pool.request()
                    .input('staffID', staffID)
                    .input('staffName', staffName)
                    .input('gender', gender)
                    .input('phone', phone)
                    .input('salary', salary)
                    .input('positionID', positionID)
                    .input('pwd', hashPwd)
                    .execute('addStaff')
                return res.json({ code: 0, message: 'add staff successfully' })
            }
        } catch (err) {
            console.log(err);
            return res.json({ code: 1, message: 'Server error' })
        }
    }
    return res.json({ code: 1, message: 'Server error' })
}

let addItems = async (req, res) => {
    let { toyID, toyName, typeID, descToy, origin, qty, inputPrice, salePrice, img1 } = req.body
    let inputBillID = `${Math.floor(Math.random() * (99999 - 1 + 1)) + 1}`
    let pool = await connection()
    let checkInputBill = await pool.request().input('inputBillID', inputBillID).execute('getInputBillByID')
    if (qty && inputPrice && salePrice && !checkInputBill.recordset.length) {
        let date = new Date()
        let inputDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        //ID existed
        if (toyID) {
            //check toyID exist ?
            let checkToyID = await pool.request().input('toyID', toyID).execute('getToyByID')
            if (!checkToyID.recordset.length)
                return res.json({ code: 1, message: 'Server error' })
            /* @inputBillID varchar(100),
               @staffID varchar(100),
               @inputDate date,
               @toyID varchar(100), 
               @qty int, 
               @inputPrice float, 
               @salePrice float */

            await pool.request()
                .input('inputBillID', inputBillID)
                .input('staffID', req.session.user.staffID)
                .input('inputDate', inputDate)
                .input('toyID', toyID)
                .input('qty', qty)
                .input('inputPrice', inputPrice)
                .input('salePrice', salePrice)
                .execute('addExistedToy')
            await pool.close()
            return res.json({ code: 0, message: 'add items successfully' })
        }
        //new Item
        else {
            toyID = `${Math.floor(Math.random() * (99999 - 1 + 1)) + 1}`

            //check toyID exist ?
            let checkToyID = await pool.request().input('toyID', toyID).execute('getToyByID')
            if (checkToyID.recordset.length)
                return res.json({ code: 1, message: 'Server error' })

            /* @inputBillID varchar(100),
                 @staffID varchar(100),
                 @inputDate date,
                 @toyID varchar(100), 
                 @toyName varchar(1000), 
                 @typeID varchar(100), 
                 @descToy varchar(3000), 
                 @origin varchar(100), 
                 @qty int, 
                 @inputPrice float, 
                 @salePrice float, 
                 @img1 varchar(4000)*/
            await pool.request()
                .input('inputBillID', inputBillID)
                .input('staffID', req.session.user.staffID)
                .input('inputDate', inputDate)
                .input('toyID', toyID)
                .input('toyName', toyName)
                .input('typeID', typeID)
                .input('descToy', descToy)
                .input('origin', origin)
                .input('qty', qty)
                .input('inputPrice', inputPrice)
                .input('salePrice', salePrice)
                .input('img1', img1)
                .execute('addToy')
            await pool.close()
            return res.json({ code: 0, message: 'add items successfully' })
        }
    }
    return res.json({ code: 1, message: 'Server error' })
}

module.exports = {
    addStaff,
    addItems
}