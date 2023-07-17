import {
    coursesSorting,
    getAndShowCategoryCourses,
    inssertCourseBoxHtmlTemplate
} from "./funcs/shared.js";
import {
    searchInArray,
    paginateItems,
    getUrlParams,
    addParamToUrl
} from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl;

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(responseCourses => {
        let courses = [...responseCourses];
        let coursesShowType = 'row';
        const categoryCoursesWrapper = document.querySelector('#category-courses-wrapper');
        const coursesShowTypeIcons = document.querySelectorAll('.courses-top-bar__icon-parent');
        const coursesFilteringSelections = document.querySelectorAll('.courses-top-bar__selection-item');
        const selectionTitleElem = document.querySelector('.courses-top-bar__selection-title');
        const coursesSearchInput = document.querySelector('.courses-top-bar__input');

        // Show Category Courses By Row ShowType
        if (courses.length) {
            inssertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper);
        } else {
            categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
                <div class="alert alert-danger">هیچ دوره ای برای این دسته بندی وجود ندارد</div>
            `)
        }

        // Show Category Courses By Row ShowType (User Selection)
        coursesShowTypeIcons.forEach(coursesShowTypeIcon => {
            coursesShowTypeIcon.addEventListener('click', (event) => {
                coursesShowTypeIcons.forEach(icon => icon.classList.remove('courses-top-bar__icon--active'))
                event.target.classList.add('courses-top-bar__icon--active');

                if (String(event.target.className).includes("row")) {
                    coursesShowType = "row";
                    inssertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper);
                } else {
                    coursesShowType = "column";
                    inssertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper);
                }
            })
        })

        // Show Category Courses By User Filtering Method
        coursesFilteringSelections.forEach(coursesFilteringSelection => {
            coursesFilteringSelection.addEventListener('click', (event) => {
                coursesFilteringSelections.forEach(selectionElem => selectionElem.classList.remove('courses-top-bar__selection-item--active'));
                event.target.classList.add('courses-top-bar__selection-item--active');
                selectionTitleElem.innerHTML = '';
                selectionTitleElem.insertAdjacentHTML('beforeend', `
                    ${event.target.innerHTML}
                    <i class="fas fa-angle-down courses-top-bar__selection__icon"></i>
                `);

                let userFilteringSelection = event.target.dataset.key;
                let shownCourses = coursesSorting([...courses], userFilteringSelection);
                inssertCourseBoxHtmlTemplate(shownCourses, coursesShowType, categoryCoursesWrapper);
            })
        })

        // Handle search in courses
        coursesSearchInput.addEventListener('input', event => {
            const shownCourses = searchInArray([...responseCourses], 'name', event.target.value);
            if (shownCourses.length) {
                inssertCourseBoxHtmlTemplate(shownCourses, coursesShowType, categoryCoursesWrapper);
            } else {
                categoryCoursesWrapper.innerHTML = '';
                categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
                    <div class="alert alert-danger">هیچ دوره ای برای این دسته بندی وجود ندارد</div>
            `)
            }
        })

        // Handle Pagination
        const coursesPaginationWrapper = document.querySelector(
            ".courses-pagination__list"
        );
        const currentPage = getUrlParams('page');
        const shownCourses = paginateItems(courses, 3, coursesPaginationWrapper, currentPage);
        inssertCourseBoxHtmlTemplate([...shownCourses], coursesShowType, categoryCoursesWrapper);
    })

})