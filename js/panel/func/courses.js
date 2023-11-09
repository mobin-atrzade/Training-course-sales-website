const getAllCourses = async () => {
    const res = await fetch(`http://localhost:4000/v1/courses`);
    const courses = await res.json();

    return courses;
}

export {
    getAllCourses
}