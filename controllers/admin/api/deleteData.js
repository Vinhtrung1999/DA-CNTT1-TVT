const { connection } = require('../../../db')

let deleteOrderBill = async (req, res) => {
    let user = req.session.user
    let saleBillID = req.body.saleBillID || ''
    let date = new Date()
    if (saleBillID) {
        try {
            let pool = await connection()
            //deleteOrderBill @saleBillID
            await pool.request()
                .input('saleBillID', saleBillID)
                .execute('deleteOrderBill')

            return res.json({ code: 0, message: 'update success' })
        } catch (err) {
            console.log(err)
            return res.json({ code: 1, message: 'Server error' })
        }
    }
    return res.json({ code: 1, message: 'Server error' })
}

module.exports = {
    deleteOrderBill
}