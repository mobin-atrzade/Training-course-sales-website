import {
    getToken,
    showSwal
} from "../../funcs/utils.js";

const getAndShowAllUsers = async () => {
    const usersListTableElem = document.querySelector('.table tbody');
    usersListTableElem.innerHTML = '';

    const res = await fetch(`http://localhost:4000/v1/users`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    const users = await res.json();

    users.forEach((user, index) => {
        usersListTableElem.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.role === "ADMIN" ? "مدیر" : "کاربر عادی"}</td>
                <td>
                    <button type="button" class="btn btn-primary edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" onclick="removeUser('${user._id}')" class="btn btn-danger delete-btn">حذف</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger delete-btn">بن</button>
                </td>
            </tr>
        `)
    })
}

const removeUser = async (userID) => {
    showSwal("آیا از حذف کاربر اطمینان دارید؟", "warning", ["نه", "آره"], async (result) => {
        if (result) {
            const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            if (res.ok) {
                showSwal("کاربر با موفقیت حذف شد", "success", "خیلی هم عالی", () => {
                    getAndShowAllUsers();
                });
            }
        }
    })
}

export {
    getAndShowAllUsers,
    removeUser
}