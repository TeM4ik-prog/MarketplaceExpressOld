let fs = require("fs")

function GetAllUsers() {
    return JSON.parse(fs.readFileSync("data/users_data.json"))
}

function RewriteUsers(Ar_users) {
    fs.writeFileSync("data/users_data.json", JSON.stringify(Ar_users, null, 4))
}

function validateUser(Ar_users, username, password) {
    let user = Ar_users.find((user) => user.username == username)
    return user && user.password == password
}


function userExists(Ar_users, username) {
    return Ar_users.some(user => user.username === username);
}





let users = GetAllUsers()

module.exports = {
    users,
    validateUser,
    GetAllUsers,
    userExists,
    RewriteUsers
}