let express = require("express")
let fs = require("fs")


let BasketRouter = express.Router()

let { findProdByName, GetProdDataFromJson, GetBasketDataFromJson,
    GetUserBasketByName, FindAllProdByName, GetAllProds } = require("../../data/dataProdsFns")


let { GetSessionData, BlockUserEnter } = require("../../All_middleware/shop_middleware")
let { RewriteUsers } = require("../../data/usersDataFns")


BasketRouter.use(GetSessionData)
BasketRouter.use(BlockUserEnter)

BasketRouter.use(express.json());

BasketRouter.get("/", (req, res) => {
    let { obj_user } = req.userDataReq

    let obj_render = {
        products: obj_user.basket,
        header: "Корзина пользователя " + obj_user.username
    }
    res.render("user_interaction/user_basket&prods.hbs", obj_render)
})

BasketRouter.get("/add", (req, res) => {
    let all_products = GetProdDataFromJson()
    let prods_in_basket = GetBasketDataFromJson()
    let { prod_name } = req.query
    let { need_prod } = findProdByName(all_products, prod_name)

    if (!need_prod) {
        return res.redirect(`/info?prod_name=${prod_name}`)
    }
    let { obj_user, index } = req.userDataReq

    obj_user.basket[prod_name] = need_prod
    obj_user.basket[prod_name].CanUserBuy = true

    prods_in_basket[index] = obj_user

    fs.writeFileSync("data/users_data.json", JSON.stringify(prods_in_basket, null, 3))
    res.redirect("back")
})

BasketRouter.post("/delete", (req, res) => {
    let prods_in_basket = GetBasketDataFromJson()
    let all_products = GetProdDataFromJson()

    let prod_name = req.body.text
    let { obj_user, index } = req.userDataReq
    let referer = req.get('Referer') || '/';
    let last_url = referer.substring(referer.lastIndexOf('/') + 1)

    if (last_url == "basket") {
        delete obj_user.basket[prod_name]
        prods_in_basket[index] = obj_user
        RewriteUsers(prods_in_basket)
    }
    else if (last_url == "my_prods") {
        let { category } = findProdByName(all_products, prod_name)
        delete all_products[category][prod_name]
        fs.writeFileSync("data/data_products.json", JSON.stringify(all_products, null, 3))//удаление из общей

        delete obj_user.prod_on_sell[prod_name]//удаление из наших товаров
        prods_in_basket[index] = obj_user
        RewriteUsers(prods_in_basket)
    }
    res.end()
})

//replace after
BasketRouter.post("/buy/delete", (req, res) => {
    let prods_in_basket = GetBasketDataFromJson()
    let all_products = GetProdDataFromJson()
    let { prod_name } = req.query
    let { obj_user, index } = req.userDataReq


    delete obj_user.basket[prod_name]
    prods_in_basket[index] = obj_user
    RewriteUsers(prods_in_basket)

    let { category } = findProdByName(all_products, prod_name)
    delete all_products[category][prod_name]
    fs.writeFileSync("data/data_products.json", JSON.stringify(all_products, null, 3))//удаление из общей

    res.end()
})

////////////
BasketRouter.get("/buy", (req, res) => {
    let all_products = GetProdDataFromJson()
    let prods_in_basket = GetBasketDataFromJson()

    let { prod_name } = req.query
    let { obj_user, index } = req.userDataReq
    let { need_prod } = findProdByName(all_products, prod_name)
    let user_balance = obj_user.balance

    if (!need_prod) {
        return res.redirect(`/info?prod_name=${prod_name}`)
    }
    let { obj_user: whoSell, index: index_whoSell } = GetUserBasketByName(need_prod.whoSell)

    if (user_balance >= need_prod.price) {
        obj_user.balance -= need_prod.price//отнимание денег у покупателя

        whoSell.balance += need_prod.price//прибавление денег продавцу
        delete whoSell.prod_on_sell[prod_name]//

        prods_in_basket[index] = obj_user
        prods_in_basket[index_whoSell] = whoSell

        RewriteUsers(prods_in_basket)
        return res.status(200).json({ massage: "Продукт куплен!", location: `/basket/buy/delete?prod_name=${prod_name}` })
    }
    else {
        return res.status(400).json({ massage: "Недостаточно денег на балансе или произошла иная ошибка" })
    }
})


module.exports = BasketRouter
