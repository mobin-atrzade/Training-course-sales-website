import {
    getCourseDetails
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    getCourseDetails().then(data => {
        console.log(data);
    })
})