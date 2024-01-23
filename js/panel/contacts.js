import {
    getAndShowAllContacts,
    showContactBody,
    answerToContact
} from "./func/contacts.js";

window.showContactBody = showContactBody;
window.answerToContact = answerToContact;

window.addEventListener('load', () => {
    getAndShowAllContacts();
})