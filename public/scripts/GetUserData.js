async function loadUser() {
    try {
        let response = await fetch("/auth/username");

        if (!response.ok) {

            document.querySelector("#login_butt").textContent = "Войти";
            document.querySelector("#logout").style.display = "none";
            return;
        }

        let data = await response.json()
        

        document.querySelector("#login_butt").textContent = "Сменить аккаунт";
        document.querySelector("#logout").style.display = "block";

        document.querySelector("#userName").textContent = data.username;
        document.querySelector("#user_balance").textContent = `Баланс: ${data.balance}`;




    } catch (error) {
        console.error("Error:", error);
    }
}

// loadUser()