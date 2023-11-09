import {
    insertNotificationHtmlTemplate,
    seenNotification
} from "./func/notifications.js";
import {
    getAdminInfos
} from "./func/utils.js";

const $ = document;

window.seenNotification = seenNotification;

window.addEventListener('load', () => {
    const adminWelcomeNameElem = $.querySelector('#admin-welcome-name');
    const adminNameElem = $.querySelector('#admin-name');
    const notificationsIconElem = $.querySelector('#notifications-icon');
    const notificationsBoxElem = $.querySelector('.home-notification-modal');

    getAdminInfos().then(admin => {

        // Protect CMS Routes
        if (admin.role === 'ADMIN') {
            // Show Admin Name In Cms HomePage
            adminNameElem.innerHTML = admin.name;
            adminWelcomeNameElem.innerHTML = admin.name;
        } else {
            location.replace('../../login.html');
        }

        notificationsIconElem.addEventListener('mouseenter', () => {
            notificationsBoxElem.classList.add('active-modal-notfication');
        })
        notificationsBoxElem.addEventListener('mouseleave', () => {
            notificationsBoxElem.classList.remove('active-modal-notfication');
        })
        insertNotificationHtmlTemplate(admin.notifications);

    })
})