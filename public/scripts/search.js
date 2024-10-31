function FilterProds() {
    let value_input = document.getElementById("search_input").value

    window.location.href = `/list_all?name_prod=${value_input}`
}

document.getElementById("search_butt").addEventListener("click", function () {
    FilterProds()
})

document.getElementById("search_input").addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        FilterProds()
    }
})



