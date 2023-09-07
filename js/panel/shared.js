import {
    getAdminInfos
} from "./func/utils.js";

const $ = document;

window.addEventListener('load', () => {
    const adminWelcomeNameElem = $.querySelector('#admin-welcome-name');
    const adminNameElem = $.querySelector('#admin-name');
    getAdminInfos().then(admin => {
        console.log(admin);

        // Protect Cms Routes
        if (admin.role === 'ADMIN') {
            // Show Admin Name In Cms HomePage
            adminNameElem.innerHTML = admin.name;
            adminWelcomeNameElem.innerHTML = admin.name;
        } else {
            location.replace('../../login.html');
        }
    })
})