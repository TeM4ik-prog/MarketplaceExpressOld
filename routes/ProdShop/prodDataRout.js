let express = require("express")
let fs = require("fs")

let ProdDataRouter = express.Router()

let { findProdByName, GetProdDataFromJson, GetAllProds } = require("../../data/dataProdsFns")
let { GetSessionData } = require("../../All_middleware/shop_middleware")

ProdDataRouter.use(GetSessionData)


ProdDataRouter.get("/", (req, res) => {
    let all_products = GetProdDataFromJson()
    let products_categories = {
        keys: Object.keys(all_products)
    }
    res.render("Main_page.hbs", products_categories)
})

ProdDataRouter.get("/list_all", (req, res) => {
    let all_products = GetProdDataFromJson()
    let { category, name_prod } = req.query

    if (req.userDataReq) {//отключение отображения тех товаров, которые выставлены на продажу пользователем
        let { obj_user } = req.userDataReq
        let user_prods = obj_user.prod_on_sell

        for (let key in user_prods) {
            let { need_prod, category } = findProdByName(all_products, key)
            if (need_prod) {
                delete all_products[category][key]
            }
        }
    }


    let filtred_list = {}
    if (category) {
        //replace after
        all_products = all_products[category]
        filtred_list.keys = [category]
    }
    else {
        filtred_list.products = GetAllProds(all_products)
        all_products = GetAllProds(all_products)
    }

    if (name_prod) {
        let BigObj = {}
        for (let key in all_products) {
            if (key.toLowerCase().includes(name_prod.toLowerCase())) {
                BigObj[key] = all_products[key]
            }
        }
        all_products = BigObj
    }


    filtred_list.products = all_products

    res.render("product/products_list.hbs", filtred_list)
})

ProdDataRouter.get("/info", (req, res) => {
    let all_products = GetProdDataFromJson()
    let { prod_name } = req.query
    let { need_prod } = findProdByName(all_products, prod_name)

    need_prod ? need_prod.isVisible = true : null

    res.render("product/product_info.hbs", need_prod)
})

module.exports = ProdDataRouter