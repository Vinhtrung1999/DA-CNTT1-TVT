const { connection } = require('../../db')

let adminHome = async (req, res) => {
    try {
        let user = req.session.user

        //get current pape
        let pageNow = parseInt(req.query.pageNow) || 1
        pageNow < 1 ? pageNow = 1 : pageNow

        //getDB
        let pool = await connection()
        let waitingBills = await pool.request().execute('getWaitingBills')
        await pool.close()

        //setPagination
        let numToysInPage = 5
        let length = waitingBills.recordset.length

        //count page
        let countPage = Math.floor(length / numToysInPage)
        length % numToysInPage === 0 ? countPage : countPage++

        //check page Now
        pageNow > countPage ? pageNow = countPage : pageNow

        //pagination
        let startPoint = (pageNow * numToysInPage) - numToysInPage
        let endPoint = pageNow * numToysInPage
        waitingBills = waitingBills.recordset.filter((val, index) => {
            if (index >= startPoint && index < endPoint)
                return val
        })

        return res.render(
            'layouts/layout-admin',
            {
                page: 'orderBills',
                waitingBills,
                pageNow,
                countPage,
                user
            }
        )
    }
    catch (err) {
        console.log(err);
    }

}

let login = (req, res) => {
    let { err } = req.query
    return res.render('login', { err })
}

let profile = async (req, res) => {
    try {
        let user = req.session.user
        let pool = await connection()
        let profile = await pool.request().input('staffID', user.staffID).execute('getStaffByID')
        return res.render(
            'layouts/layout-admin',
            {
                page: 'profile',
                profile: profile.recordset[0],
                user
            }
        )
    } catch (err) {
        console.log(err)
    }
}

let staffDetails = async (req, res) => {
    let { staffID } = req.query || ''
    if (staffID) {
        try {
            let user = req.session.user
            let pool = await connection()
            let staffDetails = await pool.request().input('staffID', staffID).execute('getStaffByID')
            if (!staffDetails.recordset.length)
                return res.redirect('/admin/listStaffs')
            return res.render(
                'layouts/layout-admin',
                {
                    page: 'staffDetails',
                    staffDetails: staffDetails.recordset[0],
                    user
                }
            )
        } catch (err) {
            console.log(err)
        }
    }
    return res.redirect('/admin/listStaff')
}

let listItems = async (req, res) => {
    try {
        let user = req.session.user

        //get current pape
        let pageNow = parseInt(req.query.pageNow) || 1
        pageNow < 1 ? pageNow = 1 : pageNow

        //getDB
        let pool = await connection()
        let listItems = await pool.request().execute('getAll')
        await pool.close()

        //setPagination
        let numToysInPage = 5
        let length = listItems.recordset.length

        //count page
        let countPage = Math.floor(length / numToysInPage)
        length % numToysInPage === 0 ? countPage : countPage++

        //check page Now
        pageNow > countPage ? pageNow = countPage : pageNow

        //pagination
        let startPoint = (pageNow * numToysInPage) - numToysInPage
        let endPoint = pageNow * numToysInPage
        listItems = listItems.recordset.filter((val, index) => {
            if (index >= startPoint && index < endPoint)
                return val
        })

        return res.render(
            'layouts/layout-admin',
            {
                page: 'listItems',
                listItems,
                pageNow,
                countPage,
                user
            }
        )
    } catch (err) {
        console.log(err)
    }
}

let itemDetails = async (req, res) => {
    let { toyID } = req.query || ''
    if (toyID) {
        let user = req.session.user
        let pool = await connection()
        let dataItem = await pool.request().input('toyID', toyID).execute('getToyByID')
        if (dataItem.recordset.length) {
            return res.render(
                'layouts/layout-admin',
                {
                    page: 'itemDetails',
                    dataItem: dataItem.recordset[0],
                    user
                }
            )
        }
    }
    return res.redirect('/admin/listItems')
}

let addItems = async (req, res) => {
    try {
        let user = req.session.user
        let pool = await connection()
        let allItems = await pool.request().execute('getAll')
        return res.render(
            'layouts/layout-admin',
            {
                page: 'addItems',
                allItems: allItems.recordset,
                user
            }
        )
    } catch (err) {
        console.log(err)
    }
}

let listBills = async (req, res) => {
    try {
        let user = req.session.user

        //get current pape
        let pageNow = parseInt(req.query.pageNow) || 1
        pageNow < 1 ? pageNow = 1 : pageNow

        //getDB
        let pool = await connection()
        let completedBills = await pool.request().execute('getCompletedBills')
        await pool.close()

        //setPagination
        let numToysInPage = 5
        let length = completedBills.recordset.length

        //count page
        let countPage = Math.floor(length / numToysInPage)
        length % numToysInPage === 0 ? countPage : countPage++

        //check page Now
        pageNow > countPage ? pageNow = countPage : pageNow

        //pagination
        let startPoint = (pageNow * numToysInPage) - numToysInPage
        let endPoint = pageNow * numToysInPage
        completedBills = completedBills.recordset.filter((val, index) => {
            if (index >= startPoint && index < endPoint)
                return val
        })
        return res.render(
            'layouts/layout-admin',
            {
                page: 'listBills',
                completedBills,
                pageNow,
                countPage,
                user
            }
        )
    }
    catch (err) {
        console.log(err);
    }

}

let listStaffs = async (req, res) => {
    try {
        let user = req.session.user

        //get current pape
        let pageNow = parseInt(req.query.pageNow) || 1
        pageNow < 1 ? pageNow = 1 : pageNow

        //get DB
        let pool = await connection()
        let listStaffs = await pool.request().execute('getAllStaffs')
        await pool.close()

        //setPagination
        let numToysInPage = 5
        let length = listStaffs.recordset.length

        //count page
        let countPage = Math.floor(length / numToysInPage)
        length % numToysInPage === 0 ? countPage : countPage++

        //check page Now
        pageNow > countPage ? pageNow = countPage : pageNow

        //pagination
        let startPoint = (pageNow * numToysInPage) - numToysInPage
        let endPoint = pageNow * numToysInPage
        listStaffs = listStaffs.recordset.filter((val, index) => {
            if (index >= startPoint && index < endPoint)
                return val
        })

        return res.render(
            'layouts/layout-admin',
            {
                page: 'listStaffs',
                listStaffs,
                countPage,
                pageNow,
                user
            }
        )
    } catch (err) {
        console.log(err)
    }
}

let addStaff = async (req, res) => {
    try {
        let user = req.session.user
        return res.render(
            'layouts/layout-admin',
            {
                page: 'addStaff',
                user
            }
        )
    } catch (err) {
        console.log(err)
    }
}

let billDetails = async (req, res) => {
    let { saleBillID, type } = req.query || ''
    if (saleBillID && type) {
        try {
            let user = req.session.user
            let pool = await connection()
            let dataBill
            let dataDetails
            switch (type) {
                case 'order':
                    dataBill = await pool.request()
                        .input('saleBillID', saleBillID)
                        .input('statusBill', 0)
                        .execute('getBillByIdAndStatus')
                    if (!dataBill.recordset.length) {
                        return res.redirect('/admin/admin-home')
                    }
                    dataDetails = await pool.request().input('saleBillID', saleBillID).execute('getBillDetailsToy')
                    return res.render(
                        'layouts/layout-admin',
                        {
                            page: 'billDetails',
                            user,
                            dataBill: dataBill.recordset[0],
                            dataDetails: dataDetails.recordset
                        }
                    )
                default:
                    dataBill = await pool.request()
                        .input('saleBillID', saleBillID)
                        .input('statusBill', 1)
                        .execute('getBillByIdAndStatus')
                    if (!dataBill.recordset.length) {
                        return res.redirect('/admin/listBills')
                    }
                    dataDetails = await pool.request().input('saleBillID', saleBillID).execute('getBillDetailsToy')
                    return res.render(
                        'layouts/layout-admin',
                        {
                            page: 'billDetails',
                            user,
                            dataBill: dataBill.recordset[0],
                            dataDetails: dataDetails.recordset
                        }
                    )
            }
        } catch (err) {
            console.log(err)
        }
    }
    return res.redirect('/admin/admin-home')
}

let changePass = (req, res) => {
    let user = req.session.user
    return res.render(
        'layouts/layout-admin',
        {
            page: 'changePass',
            user
        }
    )
}

let logout = (req, res) => {
    req.session.destroy()
    return res.redirect('/admin/login')
}

module.exports = {
    adminHome,
    login,
    profile,
    listItems,
    listStaffs,
    listBills,
    addStaff,
    billDetails,
    staffDetails,
    addItems,
    changePass,
    itemDetails,
    logout
}

