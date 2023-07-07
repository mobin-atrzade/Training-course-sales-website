import {
    getAndShowCategoryCourses
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(responseCourses => {
        let courses = [...responseCourses];
        let coursesShowType = 'row';
        const categoryCoursesWrapper = document.querySelector('#category-courses-wrapper');
        const coursesShowTypeIcons = document.querySelectorAll('.courses-top-bar__icon-parent');

        // Show Category Courses By Row ShowType
        if (courses.length) {
            courses.forEach((course) => {
                categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
                <div class="col-4">
                <div class="course-box">
                    <a href="#">
                        <img src="images/courses/fareelancer.png" alt="course img"
                            class="course-box__img" />
                    </a>
                    <div class="course-box__main">
                        <a href="#" class="course-box__title">${course.name}</a>
                        <div class="course-box__rating-teacher">
                            <div class="course-box__teacher">
                                <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                <a href="#" class="course-box__teacher-link">${course.creator}</a>
                            </div>
                            <div class="course-box__rating">
                                
                            </div>
                        </div>
                        <div class="course-box__status">
                            <div class="course-box__users">
                                <i class="fas fa-users course-box__users-icon"></i>
                                <span class="course-box__users-text">${course.registers}</span>
                            </div>
                            <span class="course-box__price">${course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="course-box__footer">
                        <a href="#" class="course-box__footer-link">
                            مشاهده اطلاعات
                            <i class="fas fa-arrow-left course-box__footer-icon"></i>
                        </a>
                    </div>
                </div>
            </div>
                `)
            })
        } else {
            categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
                <div class="alert alert-danger">هیچ دوره ای برای این دسته بندی وجود ندارد</div>
            `)
        }

        coursesShowTypeIcons.forEach(coursesShowTypeIcon => {
            coursesShowTypeIcon.addEventListener('click', event => {
                coursesShowTypeIcons.forEach(icon => icon.classList.remove('courses-top-bar__icon--active'))
                event.target.classList.add('courses-top-bar__icon--active');
            })
        })

    })
})