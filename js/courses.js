import {
    inssertCourseBoxHtmlTemplate,
    getAllCourses
} from "./funcs/shared.js";
import {
    getUrlParams,
    paginateItems,
    addParamToUrl
} from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl;

window.addEventListener('load', () => {
    getAllCourses().then(courses => {
        const coursesPaginationWrapper = document.querySelector('#courses-pagination');
        const coursesWrapperElem = document.querySelector('#courses-wrapper');
        const currentPage = getUrlParams('page');

        let shownCourses = paginateItems([...courses], 3, coursesPaginationWrapper, currentPage);
        inssertCourseBoxHtmlTemplate([...shownCourses], 'row', coursesWrapperElem);
    })
})