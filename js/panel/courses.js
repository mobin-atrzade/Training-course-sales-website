import {
    getAllCourses,
    createNewCourse,
    prepareCreateCourseForm
} from "./func/courses.js";

window.addEventListener("load", () => {

    let createCourseBtn = document.querySelector('#create-course-btn');

    getAllCourses();
    prepareCreateCourseForm();

    createCourseBtn.addEventListener("click", (event) => {
        event.preventDefault();
        createNewCourse();
    })
})