import {
    getAllCourses
} from "../panel/func/courses.js";

window.addEventListener('load', () => {
    getAllCourses().then(data => {
        console.log(data);
    })
})