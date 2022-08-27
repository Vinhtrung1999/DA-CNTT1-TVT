const { connection } = require('../../../db')

let doneBill = async (req, res) => {
    let user = req.session.user
    let saleBillID = req.body.saleBillID || ''
    let date = new Date()
    if (saleBillID) {
        try {
            let pool = await connection()

            let check = await pool.request().input('saleBillID', saleBillID).execute('getBillById')
            if (check.recordset.length) {
                //get bill detail
                let billDetails = await pool.request().input('saleBillID', saleBillID).execute('getBillDetails')
                billDetails = billDetails.recordset
                let listToys = []
                for (let val of billDetails) {
                    let toy = await pool.request().input('toyID', val.toyID).execute('getToyByID')
                    listToys = [...listToys, toy.recordset[0]]
                }

                let valUpdate = []
                for (let i = 0; i < listToys.length; i++) {
                    if (listToys[i].qty < billDetails[i].qty)
                        return res.json({ code: 3, message: `${listToys[i].toyID} only have ${listToys[i].qty}` })
                    valUpdate = [...valUpdate, { toyID: listToys[i].toyID, qty: listToys[i].qty - billDetails[i].qty }]
                }

                for (let val of valUpdate) {
                    await pool.request()
                        .input('toyID', val.toyID)
                        .input('qty', val.qty)
                        .execute('updateQty')
                }

                //complete bill
                //completeBill @saleBillID, @staffID, @saleDate
                await pool.request()
                    .input('saleBillID', saleBillID)
                    .input('staffID', user.staffID)
                    .input('saleDate', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
                    .execute('completeBill')

                return res.json({ code: 0, message: 'update success' })
            }
            return res.json({ code: 1, message: 'Bill not exist' })
        } catch (err) {
            console.log(err)
            return res.json({ code: 1, message: 'Server error' })
        }
    }
    return res.json({ code: 1, message: 'Server error' })
}

module.exports = {
    doneBill
}