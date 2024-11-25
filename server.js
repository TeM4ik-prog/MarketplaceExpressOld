let express = require("express")
let fs = require("fs")
let hbs = require("hbs")
let path = require("path")

let port = 2000
let app = express()


let { Auth_session } = require("./All_middleware/auth_middleware.js")


let BasketRouter = require("./routes/ProdShop/basketRout")
let SellRouter = require("./routes/ProdShop/sellRout");
let ProdDataRouter = require("./routes/ProdShop/prodDataRout");

let publicRouter = require("./routes/Auth/publicRout.js")
let privateRouter = require("./routes/Auth/privateRout.js")

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./uploads")));

hbs.registerPartials(path.join(__dirname, "./views/partials"));
app.set("view engine", "hbs")

app.use(Auth_session())
app.use(publicRouter)

app.use("/auth", privateRouter)
app.use("/basket", BasketRouter)
app.use("/sell", SellRouter)
app.use(ProdDataRouter)


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})