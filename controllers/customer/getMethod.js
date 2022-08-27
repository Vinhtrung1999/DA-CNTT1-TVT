const { connection } = require('../../db')

let home = async (req, res) => {
    try {
        let pool = await connection();
        let dataToys = await pool.request().execute('getAll')
        let dataTopSale = await pool.request().execute('getRandom')
        let dataTopView = await pool.request().execute('getRandom')
        let dataTopNew = await pool.request().execute('getRandom')
        pool.close()
        return res.render('layouts/layout-home',
            {
                dataToys: dataToys.recordset,
                dataTopNew: dataTopNew.recordset,
                dataTopView: dataTopView.recordset,
                dataTopSale: dataTopSale.recordset,
                page: 'index'
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.render('layouts/layout-home')
    }
}

let listToys = async (req, res) => {
    try {
        let pageNow = parseInt(req.query.pageNow) || 1
        pageNow < 1 ? pageNow = 1 : pageNow

        //getDB
        let pool = await connection();
        let dataToys = await pool.request().execute('getAll')
        await pool.close()

        let numToysInPage = 6
        let length = dataToys.recordset.length

        //count page
        let countPage = Math.floor(length / numToysInPage)
        length % numToysInPage === 0 ? countPage : countPage++

        //check page Now
        pageNow > countPage ? pageNow = countPage : pageNow

        //pagination
        let startPoint = (pageNow * numToysInPage) - numToysInPage
        let endPoint = pageNow * numToysInPage
        dataToys = dataToys.recordset.filter((val, index) => {
            if (index >= startPoint && index < endPoint)
                return val
        })
        return res.render('layouts/layout-home', { dataToys, countPage, pageNow, page: 'shop' })
    }
    catch (err) {
        console.log(err)
        return res.render('layouts/layout-home')
    }
}

let cart = async (req, res) => {
    return res.render('layouts/layout-home', { page: 'cart' })
}

let singleProduct = async (req, res) => {
    let { toyID } = req.query || ''
    if (toyID) {
        try {
            let pool = await connection()
            let dataToy = await pool.request().input('toyID', toyID).execute('getToyByID')
            let dataRelated = await pool.request().execute('getAll')
            let dataView = await pool.request().execute('getRandom')
            return res.render('layouts/layout-home',
                {
                    page: 'single-product',
                    dataToy: dataToy.recordset[0],
                    dataRelated: dataRelated.recordset,
                    dataView: dataView.recordset
                }
            )
        }
        catch (err) {
            return res.render('layouts/layout-home')
        }

    }
    return res.redirect('/')
}

module.exports = {
    home,
    listToys,
    cart,
    singleProduct
}