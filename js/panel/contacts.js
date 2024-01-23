import {
    getAndShowAllContacts,
    showContactBody
} from "./func/contacts.js";

window.showContactBody = showContactBody;

window.addEventListener('load', () => {
    getAndShowAllContacts();
})