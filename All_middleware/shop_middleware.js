let { GetUserBasketByName } = require("../data/dataProdsFns")

function GetSessionData(req, res, next) {
    let username = req.session && req.session.username

    if (username) {
        let { obj_user, index } = GetUserBasketByName(username)
        req.userDataReq = { obj_user, index }
    }
    next()
}

function BlockUserEnter(req, res, next) {
    if (!req.userDataReq) {
        return res.status(400).send("<h1><a href='/Auth_login_page'>Для начала войдите или зарегистрируйтесь</a></h1>")
    }

    next()
}


module.exports = {
    GetSessionData,
    BlockUserEnter
}