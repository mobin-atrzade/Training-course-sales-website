import {
    getAndShowAllMenus
} from "./func/menus.js";


window.addEventListener('load', () => {
    getAndShowAllMenus().then(data => {
        console.log(data);
    })
})