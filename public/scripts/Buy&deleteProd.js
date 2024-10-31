
async function BuyProduct(prodname) {
    let response = await fetch(`/basket/buy?prod_name=${prodname}`)
    let data = await response.json()


    if (!response.ok) {
        alert(data.massage)
    }
    else {
        alert(data.massage)
        window.location = data.location
    }
}


async function DeleteProdFromBasket(prodname) {
    console.log(prodname)
    await fetch("/basket/delete", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "post",
        body: JSON.stringify({ text: prodname })
    })

    window.location.reload()
}


async function DeleteMyProds(prodname) {
    console.log(prodname)
    await fetch("/buy/delete", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "post",
        body: JSON.stringify({ text: prodname })
    })

    window.location.reload()
}



