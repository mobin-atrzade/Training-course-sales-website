import {
    showSwal
} from '../../funcs/utils.js';

const getAndShowAllContacts = async () => {
    const contactsListTableElem = document.querySelector('.table tbody');
    contactsListTableElem.innerHTML = '';

    const res = await fetch(`http://localhost:4000/v1/contact`);
    const contacts = await res.json();

    contacts.forEach((contact, index) => {
        contactsListTableElem.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.createdAt.slice(0,10)}</td>
                <td>
                    <button type="button" onclick='showContactBody(${JSON.stringify(contact.body)})' class="btn btn-primary edit-btn">مشاهده</button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary edit-btn">پاسخ</button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger delete-btn">حذف</button>
                </td>
            </tr>
        `)
    })

}

const showContactBody = (body) => {
    showSwal(body, undefined, "خیلی هم عالی", () => {});
}

export {
    getAndShowAllContacts,
    showContactBody
}