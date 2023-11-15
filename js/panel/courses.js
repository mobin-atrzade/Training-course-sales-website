import {
    getAllCourses,
    createNewCourse
} from "../panel/func/courses.js";

window.addEventListener('load', () => {
    getAllCourses();
    createNewCourse();
})