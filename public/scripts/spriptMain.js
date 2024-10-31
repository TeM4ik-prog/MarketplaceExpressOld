document.getElementById("navigation").addEventListener("click", function () {
    navigation_container.style.visibility = "visible"
    document.querySelector("body").style.overflowY = "hidden"


})

document.getElementById("close_nav").addEventListener("click", function () {
    navigation_container.style.visibility = "hidden"
    document.querySelector("body").style.overflowY = "auto"
})

function scrollToTarget(targetId) {
    let targetElement = document.getElementById(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
}

function DoSquareBlock(elem_class, inClass, elseWidth) {
    let elems = document.querySelectorAll(elem_class)

    elems.forEach(elem => {
        let height = elem.clientHeight
        let img_in_div = elem.querySelector(inClass)

        if (img_in_div.clientHeight >= img_in_div.clientWidth) {
            img_in_div.style.height = "100%"
        }
        else{
            img_in_div.style.width = elseWidth
        }
        elem.style.width = height + "px"
    });
}


setInterval(() => {
    DoSquareBlock(".img_info.mini", ".img_info_in", "100%")
}, 50);

setInterval(() => {
    DoSquareBlock(".img_info.main_photos", "img", "40vw")
}, 50);



