const express = require('express')
const router = express.Router()
const getMethod = require('../../controllers/admin/getMethod')
const postMethod = require('../../controllers/admin/postMethod')
const middleware = require('../../auth/middleware')
const updateData = require('../../controllers/admin/api/updateData')
const deleteData = require('../../controllers/admin/api/deleteData')
const createData = require('../../controllers/admin/api/createData')
// get
router.get('/login', middleware.checkLogin, getMethod.login)
router.get('/profile', middleware.checkNotLogin, getMethod.profile)
router.get('/changPass', middleware.checkNotLogin, getMethod.changePass)
router.get('/admin-home', middleware.checkNotLogin, middleware.checkAuthStaff, getMethod.adminHome)
router.get('/listBills', middleware.checkNotLogin, middleware.checkAuthStaff, getMethod.listBills)
router.get('/billDetails', middleware.checkNotLogin, middleware.checkAuthStaff, getMethod.billDetails)
router.get('/listItems', middleware.checkNotLogin, middleware.checkAuthStaff, getMethod.listItems)
router.get('/itemDetails', middleware.checkNotLogin, middleware.checkAuthStaff, getMethod.itemDetails)
router.get('/addItems', middleware.checkNotLogin, middleware.checkAuthStaff, getMethod.addItems)
router.get('/listStaffs', middleware.checkNotLogin, middleware.checkAuthAdmin, getMethod.listStaffs)
router.get('/staffDetails', middleware.checkNotLogin, middleware.checkAuthAdmin, getMethod.staffDetails)
router.get('/addStaff', middleware.checkNotLogin, middleware.checkAuthAdmin, getMethod.addStaff)
router.get('/logout', getMethod.logout)

// post
router.post('/postLogin', postMethod.postLogin)
router.post('/addStaff', middleware.checkNotLogin, middleware.checkAuthAdmin, createData.addStaff)
router.post('/changePass', middleware.checkNotLogin, postMethod.changePass)
router.post('/addItems', middleware.checkNotLogin, middleware.checkAuthStaff, createData.addItems)
router.post('/updateItem', middleware.checkNotLogin, middleware.checkAuthStaff, postMethod.updateItem)

//update
router.put('/doneBill', middleware.checkNotLogin, updateData.doneBill)

//delete
router.delete('/deleteOrderBill', middleware.checkNotLogin, deleteData.deleteOrderBill)
module.exports = router