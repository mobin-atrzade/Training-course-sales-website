import {
    getAndShowRelatedCourses,
    getCourseDetails
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    getCourseDetails();
    getAndShowRelatedCourses().then(data => {
        console.log(data);
    })
})