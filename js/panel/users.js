import {
    banUser,
    getAndShowAllUsers,
    removeUser
} from "./func/users.js";


window.removeUser = removeUser;
window.banUser = banUser;

window.addEventListener('load', () => {
    getAndShowAllUsers()
})