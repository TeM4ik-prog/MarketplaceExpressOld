document.addEventListener("DOMContentLoaded", function () {
    let input = document.getElementById('file_input');
    let fileCountDisplay = document.getElementById('fileCount');

    input.addEventListener("change", function () {
        const selectedFiles = input.files;
        const maxFiles = 5;

        if (selectedFiles.length > maxFiles) {
            alert(`Привышен лимит ${maxFiles} картинок`);
            input.value = '';
            fileCountDisplay.textContent = "Выбрано картинок: 0"

        } else {
            fileCountDisplay.textContent = `Выбрано картинок: ${selectedFiles.length}`;
        }
    })



})



document.querySelector(".container_form").addEventListener("submit", async function ResultFn(event) {
    event.preventDefault()

    let formData = new FormData(event.target)

    let response = await fetch("/sell/result", {
        method: "post",
        body: formData
    }) 


  let result = await response.json()
  
  alert(result.alert)

  event.target.reset()//обнуление формы

}) 


// function ToMainPage(){
//     setTimeout(() => {
//         window.location = "/"
//     }, 2000);
// }