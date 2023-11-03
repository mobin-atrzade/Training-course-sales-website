import {
    getAdminInfos
} from "./func/utils.js";

const $ = document;

window.addEventListener('load', () => {
    const adminWelcomeNameElem = $.querySelector('#admin-welcome-name');
    const adminNameElem = $.querySelector('#admin-name');
    const notificationsIconElem = $.querySelector('#notifications-icon');
    const notificationsBoxElem = $.querySelector('.home-notification-modal');
    const NotificationModalListElem = $.querySelector('.home-notification-modal-list');

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
        notificationsIconElem.addEventListener('mouseleave', () => {
            notificationsBoxElem.classList.remove('active-modal-notfication');
        })
        notificationsBoxElem.addEventListener('mouseleave', () => {
            notificationsBoxElem.classList.remove('active-modal-notfication');
        })

        if (admin.notifications.length) {
            admin.notifications.forEach(notification => {
                NotificationModalListElem.insertAdjacentHTML('beforeend', `
                    <li class="home-notification-modal-item">
                        <span class="home-notification-modal-text">${notification.msg}</span>
                        <a>دیدم</a>
                    </li>
                `)
            })
        } else {

        }
    })
})