const { connection } = require('../../db')
const bcrypt = require('bcrypt')
let postLogin = async (req, res) => {
    let { staffID, pwd } = req.body
    if (staffID && pwd) {
        try {
            let pool = await connection()
            let staff = await pool.request().input('staffID', staffID).execute('getStaffByID')
            if (staff.recordset.length && bcrypt.compareSync(pwd, staff.recordset[0].pwd)) {
                req.session.user = staff.recordset[0]
                if (staff.recordset[0].positionID === 'ST')
                    return res.redirect('/admin/admin-home')
                else
                    return res.redirect('/admin/listStaffs')
            }
            return res.redirect('/admin/login')
        } catch (err) {
            return res.redirect('/admin/login')
        }
    }
    return res.redirect('/admin/login')
}

let changePass = async (req, res) => {
    let { newPwd } = req.body
    if (newPwd) {
        let salt = 10
        let hashNewPwd = bcrypt.hashSync(newPwd, salt)
        let pool = await connection()
        await pool.request()
            .input('staffID', req.session.user.staffID)
            .input('pwd', hashNewPwd)
            .execute('changePass')
        await pool.close()
        console.log('ok');
    }
    return res.redirect('/admin/logout')
}


let updateItem = async (req, res) => {
    let { toyID, toyName, typeID, descToy, origin, price, img1 } = req.body
    if (toyID && toyName && typeID && descToy && origin && price && img1) {
        let pool = await connection()
        await pool.request()
            .input('toyID', toyID)
            .input('toyName', toyName)
            .input('typeID', typeID)
            .input('descToy', descToy)
            .input('origin', origin)
            .input('price', price)
            .input('img1', img1)
            .execute('updateToy')

        await pool.close()
        return res.redirect(`/admin/itemDetails?toyID=${toyID}`)
    }
    return res.redirect('/admin/listItems')
}

module.exports = {
    postLogin,
    changePass,
    updateItem
}