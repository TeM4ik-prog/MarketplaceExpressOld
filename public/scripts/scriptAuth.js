async function UserLogin_Singup(Auth_page, event) {
    event.preventDefault()

    switch (Auth_page) {
        case "login":
            path = "/login"
            break;
        case "singup":
            path = "/singup"
            break
        default:
            alert("Error")
            return
    }

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let response = await fetch(path, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
    })

    let data_result = await response.json();
   
    if (!response.ok) {
        alert(data_result.massage)
        event.target.reset()
        return;
    }

    alert(data_result.massage)
    document.location.pathname = "/";
}




