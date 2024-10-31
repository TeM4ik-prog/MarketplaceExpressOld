let express = require("express")
let path = require("path")

let { checkAuth } = require("../../All_middleware/auth_middleware")
let { GetUserBasketByName } = require("../../data/dataProdsFns")

let privateRouter = express.Router()

privateRouter.use(checkAuth)
privateRouter.use(express.static(path.join(__dirname, "../private")))

privateRouter.get("/username", (req, res) => {
    let { obj_user } = GetUserBasketByName(req.session.username)
    res.json(obj_user)
})

privateRouter.get("/logout", (req, res) => {
    req.session.auth = false
    req.session.destroy()

    res.redirect("/")
})

module.exports = privateRouter