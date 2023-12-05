import {
    createNewMenu,
    getAndShowAllMenus,
    prepareCreateMenuForm,
    removeMenu
} from "./func/menus.js";

window.removeMenu = removeMenu;

window.addEventListener('load', () => {
    const createMenuBtnElem = document.querySelector('#create-menu-btn');

    prepareCreateMenuForm();
    getAndShowAllMenus();

    createMenuBtnElem.addEventListener('click', event => {
        event.preventDefault();
        createNewMenu();
    })

})