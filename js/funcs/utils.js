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

const addParamToUrl = (param, value) => {
    let url = new URL(location.href);
    let searchParams = url.searchParams;
    
    searchParams.set(param, value);
    url.search = searchParams.toString();
    location.href = url.toString();
}

const paginateItems = (array, itemsPerPage, paginateParentElem, currentPage) => {
    paginateParentElem.innerHTML = ''
    let endIndex = itemsPerPage * currentPage
    let startIndex = endIndex - itemsPerPage
    let paginatedItems = array.slice(startIndex, endIndex)
    let paginatedCount = Math.ceil(array.length / itemsPerPage)

    for (let i = 1; i < paginatedCount + 1; i++) {
        paginateParentElem.insertAdjacentHTML('beforeend', `
          <div class="courses-pagination__item">
            ${
                i === Number(currentPage) ? `
                    <a onclick="addParamToUrl('page', ${i})" class="courses-pagination__link courses-pagination__link--active">
                        ${i}
                    </a>
                    ` : `
                    <a onclick="addParamToUrl('page', ${i})" class="courses-pagination__link">
                        ${i}
                    </a>
                `
            }
          </div>
      `)
    }
    return paginatedItems
}

export {
    showSwal,
    saveIntoLocalStorage,
    getFromLocalStorage,
    getToken,
    isLogin,
    getUrlParams,
    searchInArray,
    paginateItems,
    addParamToUrl
};