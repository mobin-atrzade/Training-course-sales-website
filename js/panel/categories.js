import {
    getAndShowAllCategories,
    removeCategory
} from "./func/categories.js"

window.removeCategory = removeCategory;

window.addEventListener('load', () => {
    getAndShowAllCategories();
})