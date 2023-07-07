import {
    getAndShowCategoryCourses,
    inssertCourseBoxHtmlTemplate
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(responseCourses => {
        let courses = [...responseCourses];
        let coursesShowType = 'row';
        const categoryCoursesWrapper = document.querySelector('#category-courses-wrapper');
        const coursesShowTypeIcons = document.querySelectorAll('.courses-top-bar__icon-parent');

        // Show Category Courses By Row ShowType
        if (courses.length) {
            inssertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper);
        } else {
            categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
                <div class="alert alert-danger">هیچ دوره ای برای این دسته بندی وجود ندارد</div>
            `)
        }

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
    })
})