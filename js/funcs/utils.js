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
    const userInfos = JSON.parse(localStorage.getItem('user'));
    return userInfos ? userInfos.token : null
}

const isLogin = () => {
    const userInfos = localStorage.getItem('user');
    return userInfos ? true : false;
}

const getUrlParams = (key) => {
    const urlParams = new URLSearchParams(window.location.search);
    const getParam = urlParams.get(key);
    return getParam.split('/').pop();
}

const searchInArray = (array, searchProperty, searchValue) => {
    let outputArray = array.filter(item => item[searchProperty].includes(searchValue));
    return outputArray;
}

export {
    showSwal,
    saveIntoLocalStorage,
    getFromLocalStorage,
    getToken,
    isLogin,
    getUrlParams,
    searchInArray
};