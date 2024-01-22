const getAndShowAllCategories = async () => {
    const categoriesListElem = document.querySelector('.table tbody');
    categoriesListElem.innerHTML = '';

    const res = await fetch(`http://localhost:4000/v1/category`);
    const categories = await res.json();

    categories.forEach((category, index) => {
        categoriesListElem.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${index + 1}</td>
                <td>${category.title}</td>
                <td>${category.name}</td>
                <td>
                    <button type="button" class="btn btn-primary edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" onclick="removeCategory('${category._id}')" class="btn btn-danger delete-btn">حذف</button>
                </td>
            </tr>
        `)
    })

    console.log(categories);
}

const removeCategory = async (categoryID) => {
    console.log(categoryID);
}

export {
    getAndShowAllCategories,
    removeCategory
}