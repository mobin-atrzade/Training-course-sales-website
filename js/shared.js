import {
    getMe
} from "./funcs/auth.js";
import {
    showUserNameInNavbar
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    showUserNameInNavbar();
})