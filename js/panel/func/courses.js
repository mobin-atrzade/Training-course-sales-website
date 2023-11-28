import {
    getToken,
    showSwal
} from '../../funcs/utils.js';

let categoryID = -1;
let status = "start";
let courseCover = null;

const getAllCourses = async () => {
    const coursesTabelElem = document.querySelector('.table tbody');
    coursesTabelElem.innerHTML = '';

    const res = await fetch(`http://localhost:4000/v1/courses`);
    const courses = await res.json();

    courses.forEach((course, index) => {
        coursesTabelElem.insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td id="id">${course.name}</td>
                <td id="name">
                    ${course.price === 0 ? "رایگان" : course.price}
                </td>
                <td id="number">${course.registers}</td>
                <td id="condition">${course.support}</td>
                <td id="price">${course.categoryID.title}</td>
                <td id="price">
                    ${course.courseAverageScore}
                </td>
                <td id="price">${course.isComplate === 0 ? "در حال برگزاری" : "تکمیل شده"}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="delete-btn">حذف</button>
                </td>
            </tr>
        `)
    })

    return courses;
}

const prepareCreateCourseForm = async () => {
    const categoryListElem = document.querySelector('.category-list');
    const courseStatusPresellElem = document.querySelector('#presell');
    const courseStatusStartElem = document.querySelector('#start');
    const courseCoverElem = document.querySelector('#course-cover');

    const res = await fetch(`http://localhost:4000/v1/category`);
    const categories = await res.json();

    categories.forEach(category => {
        categoryListElem.insertAdjacentHTML('beforeend', `
            <option value="${category._id}">${category.title}</option>
        `)
    })

    categoryListElem.addEventListener('change', (event) => categoryID = event.target.value);
    courseStatusPresellElem.addEventListener('change', (event) => status = event.target.value);
    courseStatusStartElem.addEventListener('change', (event) => status = event.target.value);

    courseCoverElem.addEventListener('change', (event) => (courseCover = event.target.files[0]));
}

const createNewCourse = async () => {

    const courseNameElem = document.querySelector('#course-name');
    const coursePriceElem = document.querySelector('#course-price');
    const courseDescriptionElem = document.querySelector('#course-description');
    const courseShortNameElem = document.querySelector('#course-shortname');
    const courseSupportElem = document.querySelector('#course-support');

    const formData = new FormData();

    formData.append('name', courseNameElem.value.trim());
    formData.append('price', coursePriceElem.value.trim());
    formData.append('description', courseDescriptionElem.value.trim());
    formData.append('shortName', courseShortNameElem.value.trim());
    formData.append('support', courseSupportElem.value.trim());
    formData.append('categoryID', categoryID);
    formData.append('status', status);
    formData.append('cover', courseCover);

    const res = await fetch(`http://localhost:4000/v1/courses`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: formData,
    })

    if (res.ok) {
        showSwal("دوره جدید با موفقیت ساخته شد", "success", "خیلی هم عالی", () => {
            getAllCourses();
        });
    }
}

export {
    getAllCourses,
    createNewCourse,
    prepareCreateCourseForm
}