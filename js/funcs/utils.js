const showSwal = (title, icon, buttons, callBack) => {
    swal({
        title,
        icon,
        buttons
    }).then(result => callBack(result));
}

const saveIntoLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
}

const getFromLocalStorage = (key) => {
    return JSON.stringify(localStorage.getItem(key));
}

const getToken = () => {
    return JSON.parse(localStorage.getItem('user')).token
}

export {
    showSwal,
    saveIntoLocalStorage,
    getFromLocalStorage,
    getToken
};