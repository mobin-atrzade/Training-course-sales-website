const getAndShowAllMenus = async () => {
    const menusWrapperElem = document.querySelector('.table tbody');

    const res = await fetch(`http://localhost:4000/v1/menus`);
    const menus = await res.json();
    return menus;
}

export {
    getAndShowAllMenus
};