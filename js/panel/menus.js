import {
    createNewMenu,
    getAndShowAllMenus,
    prepareCreateMenuForm
} from "./func/menus.js";


window.addEventListener('load', () => {
    const createMenuBtnElem = document.querySelector('#create-menu-btn');

    prepareCreateMenuForm();
    getAndShowAllMenus();

    createMenuBtnElem.addEventListener('click', event => {
        event.preventDefault();
        createNewMenu();
    })

})