import {
    getAndShowNavbarMenus,
    renderTopbarMenus,
    showUserNameInNavbar
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    showUserNameInNavbar();
    renderTopbarMenus();
})