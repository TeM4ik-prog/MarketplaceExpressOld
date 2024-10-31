let express = require("express")
let fs = require("fs")
let path = require("path")
let multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage//временное хранилище
});
const destinationUploads = "public/uploads"

let SellRouter = express.Router()

let { GetProdDataFromJson, GetBasketDataFromJson, GetUserBasketByName, FindAllProdByName } = require("../../data/dataProdsFns")
let { GetSessionData, BlockUserEnter } = require("../../All_middleware/shop_middleware");
let { RewriteUsers } = require("../../data/usersDataFns");

SellRouter.use(GetSessionData)
SellRouter.use(BlockUserEnter)

SellRouter.get('/', (req, res) => {
    let all_products = GetProdDataFromJson()
    let need_info_obj_render_form = {
        categories: Object.keys(all_products)
    }
    res.render("user_interaction/prod_sell.hbs", need_info_obj_render_form)
})

SellRouter.post("/result", upload.array('imgs', 5), (req, res) => {
    let all_products = GetProdDataFromJson()
    let prods_in_basket = GetBasketDataFromJson()

    let { obj_user, index } = req.userDataReq

    try {
        let imgs_ar = req.files
        let Ar_paths_names = []

        let text_fields = Object.assign({}, req.body)//убирает ключ null prototype 
        let prod_name = text_fields.name

        for (let i = 0; i < imgs_ar.length; i++) {
            let file = imgs_ar[i]

            let file_destination = path.join(destinationUploads, file.originalname)
            Ar_paths_names.push("uploads/" + file.originalname)

            fs.writeFileSync(file_destination, file.buffer)
        }

        let obj_prod = {
            name: prod_name,
            price: parseInt(text_fields.price),
            info_prod: {
                info: text_fields.description
            },
            imgs: Ar_paths_names,
            whoSell: obj_user.username
        }

        all_products[text_fields.category][prod_name] = obj_prod//общее
        fs.writeFileSync("data/data_products.json", JSON.stringify(all_products, null, 3))

        obj_user.prod_on_sell[prod_name] = obj_prod//для пользователя
        prods_in_basket[index] = obj_user
        RewriteUsers(prods_in_basket)

        res.json({ alert: "Продукт успешно выставлен на продажу" });
    }
    catch {
        res.json({ alert: "Ошибка" });
    }
})

SellRouter.get("/my_prods", (req, res) => {
    let { obj_user } = req.userDataReq
    let obj_render = {
        products: obj_user.prod_on_sell,
        header: "Продукты на продаже пользователя " + obj_user.username
    }

    res.render("user_interaction/user_basket&prods.hbs", obj_render)
})



module.exports = SellRouter

