import {
    getAndShowAllUsers,
    removeUser
} from "./func/users.js";


window.removeUser = removeUser

window.addEventListener('load', () => {
    getAndShowAllUsers()
})