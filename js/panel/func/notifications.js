import {
    getToken
} from "../../funcs/utils.js";

const insertNotificationHtmlTemplate = (notifications) => {

    const NotificationModalListElem = document.querySelector('.home-notification-modal-list');

    NotificationModalListElem.innerHTML = '';
    if (notifications.length) {
        notifications.forEach(notification => {
            NotificationModalListElem.insertAdjacentHTML('beforeend', `
                <li class="home-notification-modal-item">
                    <span class="home-notification-modal-text">${notification.msg}</span>
                    <a onclick='seenNotification(${JSON.stringify(notifications)}, ${JSON.stringify(notification._id)})'>دیدم</a>
                </li>
            `)
        })
    } else {
        NotificationModalListElem.insertAdjacentHTML('beforeend', `
        <li class="alert alert-danger text-center">
            هیچ نوتیفیکیشنی وجود ندارد
        </li>`)
    }
}

const seenNotification = async (notifications, notificationId) => {
    const res = await fetch(`http://localhost:4000/v1/notifications/see/${notificationId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
    removeNotification(notifications, notificationId);

    const result = await res.json();
}

const removeNotification = (notifications, notificationId) => {
    const filteredNotifications = notifications.filter(notification => notification._id !== notificationId);

    insertNotificationHtmlTemplate(filteredNotifications);
}

export {
    insertNotificationHtmlTemplate,
    seenNotification
}