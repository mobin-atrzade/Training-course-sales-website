import {
    createNewNewsLetter,
    renderTopbarMenus,
    showUserNameInNavbar
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    showUserNameInNavbar();
    renderTopbarMenus();

    // Join On NewsLetter
    const newsLetterSubmitBtn = document.querySelector('#news-letter-submit-btn');
    newsLetterSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        createNewNewsLetter();
    })
})