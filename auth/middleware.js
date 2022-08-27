let checkLogin = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/admin/admin-home')
    }
    next()
}

let checkNotLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/admin/login')
    }
    next()
}

let checkAuthAdmin = (req, res, next) => {
    if (req.session.user.positionID === 'ST') {
        return res.redirect('/admin/admin-home')
    }
    next()
}

let checkAuthStaff = (req, res, next) => {
    if (req.session.user.positionID === 'MNG') {
        return res.redirect('/admin/listStaffs')
    }
    next()
}

module.exports = {
    checkLogin,
    checkNotLogin,
    checkAuthAdmin,
    checkAuthStaff
}