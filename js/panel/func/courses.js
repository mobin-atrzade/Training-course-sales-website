const getAllCourses = async () => {
    const coursesTabelElem = document.querySelector('.table tbody');

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

const createNewCourse = async () => {
    const categoryListElem = document.querySelector('.category-list');

    let categoryID = -1;

    const res = await fetch(`http://localhost:4000/v1/category`);
    const categories = await res.json();

    console.log(categories);

    categories.forEach(category => {
        categoryListElem.insertAdjacentHTML('beforeend', `
            <option value="${category._id}">${category.title}</option>
        `)
    })

    categoryListElem.addEventListener('change', event => {
        categoryID = event.target.value;
        console.log(categoryID);
    });
}

export {
    getAllCourses,
    createNewCourse
}