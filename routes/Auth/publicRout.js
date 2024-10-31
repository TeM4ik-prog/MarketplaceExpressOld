let express = require("express")
let path = require("path")
let fs = require("fs")

let publicRouter = express.Router()

let { GetAllUsers, validateUser, userExists, RewriteUsers } = require("../../data/usersDataFns")

let loginPage = fs.readFileSync("./public/pages/loginPage.html", "utf-8")
let singupPage = fs.readFileSync("./public/pages/singupPage.html", "utf-8")

publicRouter.use(express.static(path.join(__dirname, "../public")))
publicRouter.use(express.json())


publicRouter.get("/Auth_login_page", (_, res) => {
    res.status(200).send(loginPage)
})

publicRouter.get("/Auth_singup_page", (_, res) => {
    res.status(200).send(singupPage)
})

publicRouter.post("/login", (req, res) => {
    let users = GetAllUsers()
    let { username, password } = req.body

    if (!validateUser(users, username, password)) {
        return res.status(400).json({ massage: "Данных не обнаружено!" })
    }

    req.session.auth = true
    req.session.username = username

    res.status(200).json({ massage: `Успешный вход, ${username}`})
})

publicRouter.post("/singup", (req, res) => {
    let users = GetAllUsers()
    let { username, password } = req.body

    let user = {
        username: username,
        password: password,
        balance: 10000,//replace after
        basket: {},
        prod_on_sell: {}
    }

    if (!userExists(users, username)) {
        users.push(user)
    }
    else {
        return res.status(400).json({ massage: "Пользователь с таким именем существует!" })
    }

    req.session.auth = true
    req.session.username = username

    RewriteUsers(users)
    res.status(200).json({ massage: `Успешная регистрация, ${username}`})
})

module.exports = publicRouter




