const { connect } = require('mssql')
const { connection } = require('../../db')
let buy = async (req, res) => {
    let { arrID, name, address, phone } = req.body
    if (arrID && name && address && phone) {
        try {
            //check qty
            let saleBillID = `${Math.floor(Math.random() * (99999 - 1 + 1)) + 1}`
            let pool = await connection()
            let sql = `INSERT INTO DETAILSALE VALUES `
            let total = 0
            arrID.forEach((val, index) => {
                //saleBillID, toyID, qty, total
                index === (arrID.length - 1)
                    ? sql += `('${saleBillID}', '${val.toyID}', ${parseInt(val.qty)}, ${parseFloat(val.price) * parseInt(val.qty)})`
                    : sql += `('${saleBillID}', '${val.toyID}', ${parseInt(val.qty)}, ${parseFloat(val.price) * parseInt(val.qty)}),`
                total += parseFloat(val.price) * parseInt(val.qty)
            })

            //@saleBillID, @staffID, @saleDate, @customerName, @address, @phone, @total, @statusBill
            let date = new Date()
            await pool.request()
                .input('saleBillID', saleBillID)
                .input('staffID', '')
                .input('saleDate', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
                .input('customerName', name)
                .input('address', address)
                .input('phone', phone)
                .input('total', total)
                .input('statusBill', 0)
                .execute('addBill')

            await pool.request().query(sql)
            await pool.close()
            return res.json({ code: 0, message: 'create bill success' })

        }
        catch (err) {
            console.log(err);
            return res.json({ code: 1, message: 'Server error' })
        }
    }
    return res.json({ code: 1, message: 'Server error' })
}

module.exports = {
    buy
}