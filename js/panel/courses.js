import {
    createNewCourse,
    getAllCourses,
    prepareCreateCourseForm,
    removeCourse
} from "./func/courses.js";

window.removeCourse = removeCourse;

window.addEventListener("load", () => {

    const createCourseBtn = document.querySelector('#create-course-btn');

    getAllCourses();
    prepareCreateCourseForm();

    createCourseBtn.addEventListener("click", (event) => {
        event.preventDefault();
        createNewCourse();
    });
})