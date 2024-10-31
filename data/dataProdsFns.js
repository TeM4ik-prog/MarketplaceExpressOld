let fs = require("fs")

function FindAllProdByName(obj, name) {
    let result_objs = {}
    for (let key in obj) {
        for (let mini_key in obj[key]) {
            if (mini_key.toLowerCase().includes(name.toLowerCase())) {
                let obj_res = obj[key][mini_key]

                result_objs[obj_res.name] = obj_res


            }
        }
    }
    return result_objs ? result_objs : false

}




function findProdByName(obj, name) {
    for (let category in obj) {
        for (let mini_key in obj[category]) {
            if (mini_key.toLowerCase() == name.toLowerCase()) {
                let need_prod = obj[category][mini_key]

                return { need_prod, category }//вывод продукт-объекта и его категории
            }
        }

    }
    return false
}




function GetProdDataFromJson() {
    return JSON.parse(fs.readFileSync("./data/data_products.json", "utf-8"))
}

function GetBasketDataFromJson() {
    return JSON.parse(fs.readFileSync("./data/users_data.json", "utf-8"))


}

function GetUserBasketByName(username) {
    let basketAll = GetBasketDataFromJson()
    let obj_user = basketAll.find(obj => obj.username == username)

    let result = {
        obj_user: obj_user,
        index:  basketAll.indexOf(obj_user)
    }
    return result
}

// function GetSellProdsDataFromJson(){
//     return JSON.parse(fs.readFileSync("./data/users_data.json", "utf-8"))
// }


function GetAllProds(obj) {
    let obj_prods = {}
    for (let key in obj) {
        for (let prod in obj[key]) {
            obj_prods[prod] = obj[key][prod]
        }
    }
    return obj_prods
}






module.exports = {
    findProdByName,
    GetProdDataFromJson,
    GetBasketDataFromJson,
    FindAllProdByName,
    GetAllProds,
    GetUserBasketByName

}