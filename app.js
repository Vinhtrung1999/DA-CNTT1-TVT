const express = require('express')
const app = express()
const customerRoute = require('./routes/customer/customerRoutes')
const adminRoute = require('./routes/admin/adminRoutes')
const session = require('express-session')
app.set('view engine', 'ejs')
app.use(session({
    secret: 'tvtToys'
}))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.use('', customerRoute)

app.use('/admin', adminRoute)

module.exports = app