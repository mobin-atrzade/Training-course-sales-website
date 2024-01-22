import {
    getAndShowAllCategories,
    removeCategory,
    createCategory
} from "./func/categories.js"

window.removeCategory = removeCategory;

window.addEventListener('load', () => {

    const createNewCategoryBtn = document.querySelector('#create-category');
    getAndShowAllCategories();

    createNewCategoryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createCategory();
    })
})