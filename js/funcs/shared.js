import {
    getMe
} from "./auth.js";
import {
    getToken,
    getUrlParams,
    isLogin
} from "./utils.js";

const showUserNameInNavbar = () => {
    const navbarProfileBox = document.querySelector('.main-header__profile');
    const isUserLogin = isLogin();

    if (isUserLogin) {
        const userInfos = getMe().then(data => {
            navbarProfileBox.setAttribute("href", "index.html");
            navbarProfileBox.innerHTML = `<span class="main-header__profile-text">${data.name}</span>`
        })
    } else {
        navbarProfileBox.setAttribute('href', 'login.html');
        navbarProfileBox.innerHTML = `<span class="main-header__profile-text">ثبت نام / ورود</span>`
    }
}

const renderTopbarMenus = async () => {
    const topBarList = document.querySelector('.top-bar__menu');

    const res = await fetch(`http://localhost:4000/v1/menus/topbar`);
    const topBarMenus = await res.json();

    topBarList.innerHTML = "";
    const shuffledArray = topBarMenus.sort((a, b) => 0.5 - Math.random());
    shuffledArray.splice(0, 6).map(menu => {
        topBarList.innerHTML += `
            <li class="top-bar__item"><a href="#" class="top-bar__link">${menu.title}</a></li>
         `
    })
}

const getAndShowAllCourses = async () => {
    const coursesContainer = document.querySelector('#courses-container');

    const res = await fetch(`http://localhost:4000/v1/courses`);
    const courses = await res.json();
    courses.splice(0, 6).map((course) => {
        coursesContainer.insertAdjacentHTML("beforeend", `
        <div class="col-4">
        <div class="course-box">
            <a href="course.html?name=${course.shortName}">
                <img src=http://localhost:4000/courses/covers/${course.cover} alt="course img"
                    class="course-box__img" />
            </a>
            <div class="course-box__main">
                <a href="course.html?name=${course.shortName}" class="course-box__title">${course.name}</a>
                <div class="course-box__rating-teacher">
                    <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link">${course.creator}</a>
                    </div>
                    <div class="course-box__rating">
                        ${Array(5 - course.courseAverageScore).fill(0).map((score)=> 
                            '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                            ).join('')}
                        ${Array(course.courseAverageScore).fill(0).map((score)=> 
                            '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                            ).join('')}
                    </div>
                </div>
                <div class="course-box__status">
                    <div class="course-box__users">
                        <i class="fas fa-users course-box__users-icon"></i>
                        <span class="course-box__users-text">${course.registers}</span>
                    </div>
                    <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
                </div>
            </div>
            <div class="course-box__footer">
                <a href="#" class="course-box__footer-link">
                    مشاهده اطلاعات
                    <i class="fas fa-arrow-left course-box__footer-icon"></i>
                </a>
            </div>
        </div>
    </div>
    `)
    })
}

const getAndShowPopularCourses = async () => {
    const popularCoursesWrapper = document.querySelector('#popular-courses-wrapper');

    const res = await fetch(`http://localhost:4000/v1/courses/popular`);
    const popularCourses = await res.json();
    popularCourses.forEach(course => {
        popularCoursesWrapper.insertAdjacentHTML("beforeend", `
        <div class="swiper-slide">
        <div class="course-box">
            <a href="course.html?name=${course.shortName}">
                <img src=http://localhost:4000/courses/covers/${course.cover} alt="course img"
                    class="course-box__img" />
            </a>
            <div class="course-box__main">
                <a href="course.html?name=${course.shortName}" class="course-box__title">${course.name}</a>
                <div class="course-box__rating-teacher">
                    <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link">${course.creator}</a>
                    </div>
                    <div class="course-box__rating">
                    ${Array(5 - course.courseAverageScore).fill(0).map((score)=> 
                        '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                        ).join('')}
                    ${Array(course.courseAverageScore).fill(0).map((score)=> 
                        '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                        ).join('')}
                    </div>
                </div>
                <div class="course-box__status">
                    <div class="course-box__users">
                        <i class="fas fa-users course-box__users-icon"></i>
                        <span class="course-box__users-text">${course.registers}</span>
                    </div>
                    <span class="course-box__price">${course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</span>
                </div>
            </div>
            <div class="course-box__footer">
                <a href="#" class="course-box__footer-link">
                    مشاهده اطلاعات
                    <i class="fas fa-arrow-left course-box__footer-icon"></i>
                </a>
            </div>
        </div>
    </div>
        `)
    })
    return popularCourses;
}

const getAndShowPresellCourses = async () => {
    const presellCoursesWrapper = document.querySelector('#presell-courses-wrapper');

    const res = await fetch(`http://localhost:4000/v1/courses/presell`);
    const presellCourses = await res.json();

    presellCourses.forEach((course) => {
        presellCoursesWrapper.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide">
        <div class="course-box">
            <a href="course.html?name=${course.shortName}">
                <img src=http://localhost:4000/courses/covers/${course.cover} alt="course img" class="course-box__img" />
            </a>
            <div class="course-box__main">
                <a href="course.html?name=${course.shortName}" class="course-box__title">${course.name}</a>
                <div class="course-box__rating-teacher">
                    <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link">${course.creator}</a>
                    </div>
                    <div class="course-box__rating">
                    ${Array(5 - course.courseAverageScore).fill(0).map((score)=> 
                        '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                        ).join('')}
                    ${Array(course.courseAverageScore).fill(0).map((score)=> 
                        '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                        ).join('')}
                    </div>
                </div>
                <div class="course-box__status">
                    <div class="course-box__users">
                        <i class="fas fa-users course-box__users-icon"></i>
                        <span class="course-box__users-text">${course.registers}</span>
                    </div>
                    <span class="course-box__price">${course.price ? 'رایگان' : course.price.toLocaleString()}</span>
                </div>
            </div>
            <div class="course-box__footer">
                <a href="#" class="course-box__footer-link">
                    مشاهده اطلاعات
                    <i class="fas fa-arrow-left course-box__footer-icon"></i>
                </a>
            </div>
        </div>
    </div>
        `)
    })
    return presellCourses;
}

const getAndShowArticles = async () => {
    const articlesWrapper = document.querySelector('#articles-wrapper');

    const res = await fetch(`http://localhost:4000/v1/articles`);
    const articles = await res.json();

    articles.splice(0, 6).forEach((article) => {
        articlesWrapper.insertAdjacentHTML('beforeend', `
            <div class="col-4">
            <div class="article-card">
                <div class="article-card__header">
                    <a href="#" class="article-card__link-img">
                        <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="Article Cover" />
                    </a>
                </div>
                <div class="article-card__content">
                    <a href="#" class="article-card__link">
                        ${article.title}
                    </a>
                    <p class="article-card__text">
                        ${article.description}
                    </p>
                    <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                </div>
            </div>
        </div>
        `)
    })
    return articles;
}

const getAndShowNavbarMenus = async () => {
    const menusWrapper = document.querySelector('#menus-wrapper');

    const res = await fetch(`http://localhost:4000/v1/menus`);
    const menus = await res.json();

    menus.forEach((menu) => {
        menusWrapper.insertAdjacentHTML('beforeend', `
            <li class="main-header__item">
                <a href=category.html?cat=${menu.href} class="main-header__link">${menu.title}   
                ${menu.submenus.length !== 0 ? `
                            <i class="fas fa-angle-down main-header__link-icon"></i>
                            <ul class="main-header__dropdown">
                                ${
                                    menu.submenus.map((submenu) => (
                                        `
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">${submenu.title}</a>
                                        </li>
                                        `
                                    )).join('')
                                }
                            </ul>
                        ` : ''
                    }
                </a>
            </li>
        `)
    })

    return menus;
}

const getAndShowCategoryCourses = async () => {
    const categoryName = getUrlParams('cat');

    const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`);
    const courses = await res.json();

    return courses;
}

const inssertCourseBoxHtmlTemplate = (courses, showType, parentElement) => {
    parentElement.innerHTML = "";

    if (showType === "row") {
        courses.forEach((course) => {
            parentElement.insertAdjacentHTML('beforeend', `
            <div class="col-4">
            <div class="course-box">
                <a href="course.html?name=${course.shortName}">
                    <img src="http://localhost:4000/courses/covers/${course.cover}" alt="course img"
                        class="course-box__img" />
                </a>
                <div class="course-box__main">
                    <a href="course.html?name=${course.shortName}" class="course-box__title">${course.name}</a>
                    <div class="course-box__rating-teacher">
                        <div class="course-box__teacher">
                            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                            <a href="#" class="course-box__teacher-link">${course.creator}</a>
                        </div>
                        <div class="course-box__rating">
                        ${Array(5 - course.courseAverageScore).fill(0).map((score)=> 
                            '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                            ).join('')}
                        ${Array(course.courseAverageScore).fill(0).map((score)=> 
                            '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                            ).join('')}
                        </div>
                    </div>
                    <div class="course-box__status">
                        <div class="course-box__users">
                            <i class="fas fa-users course-box__users-icon"></i>
                            <span class="course-box__users-text">${course.registers}</span>
                        </div>
                        <span class="course-box__price">${course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</span>
                    </div>
                </div>
                <div class="course-box__footer">
                    <a href="#" class="course-box__footer-link">
                        مشاهده اطلاعات
                        <i class="fas fa-arrow-left course-box__footer-icon"></i>
                    </a>
                </div>
            </div>
        </div>
            `)
        })
    } else {
        courses.forEach(course => {
            parentElement.insertAdjacentHTML('beforeend', `
            <div class="col-12">
            <div class="course-box">
                <div class="course__box-header">
                    <div class="course__box-right">
                        <a class="course__box-right-link" href="course.html?name=${course.shortName}">
                            <img src=http://localhost:4000/courses/covers/${course.cover} class="course__box-right-img">
                        </a>
                    </div>
                    <div class="course__box-left">
                        <div class="course__box-left-top">
                            <a href="course.html?name=${course.shortName}" class="course__box-left-link">${course.name}</a>
                        </div>
                        <div class="course__box-left-center">
                            <div class="course__box-left-teacher">
                                <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                <span class="course__box-left-name">${course.creator}</span>
                            </div>
                            <div class="course__box-left-stars">
                            ${Array(5 - course.courseAverageScore).fill(0).map((score)=> 
                                '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                                ).join('')}
                            ${Array(course.courseAverageScore).fill(0).map((score)=> 
                                '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                                ).join('')}
                            </div>
                        </div>
                        <div class="course__box-left-bottom">
                            <div class="course__box-left-des">
                                <p>امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به قدری
                                    که
                                    حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js پیاده
                                    سازی
                                    نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند. پس
                                    شما هم
                                    اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های
                                    کاربردی
                                    که در بازار کار استفاده می شوند را به خوبی بلد باشید</p>
                            </div>
                        </div>
                        <div class="course__box-footer">
                            <div class="course__box-footer-right">
                                <i class="course__box-footer-icon fa fa-users"></i>
                                <span class="course__box-footer-count">${course.registers}</span>
                            </div>
                            <span class="course__box-footer-left">${course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `)
        })
    }
}

const coursesSorting = (array, filterMethod) => {
    let outputArray = [];

    switch (filterMethod) {
        case 'free': {
            outputArray = array.filter(course => course.price === 0);
            break;
        }
        case 'money': {
            outputArray = array.filter(course => course.price !== 0);
            break;
        }
        case 'first': {
            outputArray = [...array].reverse();
            break;
        }
        case 'last': {
            outputArray = array;
            break;
        }
        case 'default': {
            outputArray = array;
            break;
        }
        default: {
            outputArray: array;
        }
    }
    return outputArray;
}

const getCourseDetails = async () => {
    const courseShortName = getUrlParams('name');
    let $ = document;
    const courseTitleElem = $.querySelector('.course-info__title');
    const courseDescElem = $.querySelector('.course-info__text');
    const courseCategoryElem = $.querySelector('.course-info__link');
    const courseRegisterInfoElem = $.querySelector('.course-info__register-title');
    const courseStatusElem = $.querySelector('.course-boxes__box-left-subtitle');
    const courseSupportElem = $.querySelector('.course-boxes__box-left-subtitle--support');
    const courseLastUpdateElem = $.querySelector('.course-boxes__box-left-subtitle--last-update');
    const courseCommentsCountElem = $.querySelector('.course-info__total-comment-text');
    const courseStudentsCountElem = $.querySelector('.course-info__total-sale-number');
    const courseVideoCoverElem = $.querySelector('.course-info__video');

    const res = await fetch(`http://localhost:4000/v1/courses/${courseShortName}`);
    const courseDetail = await res.json();
    console.log(courseDetail);

    courseTitleElem.innerHTML = courseDetail.name;
    courseDescElem.innerHTML = courseDetail.description;
    courseCategoryElem.innerHTML = courseDetail.categoryID.title;
    courseRegisterInfoElem.insertAdjacentHTML('beforeend', courseDetail.isUserRegisteredToThisCourse ? 'دانشجو دوره هستید' : 'ثبت نام در دوره');
    courseStatusElem.innerHTML = courseDetail.isComplete ? "تکمیل شده" : "در حال برگزاری";
    courseSupportElem.innerHTML = courseDetail.support;
    courseLastUpdateElem.innerHTML = courseDetail.updatedAt.slice(0, 10);
    courseCommentsCountElem.innerHTML = `${courseDetail.comments.length} دیدگاه`;
    courseStudentsCountElem.innerHTML = courseDetail.courseStudentsCount;
    courseVideoCoverElem.setAttribute('poster', `http://localhost:4000/courses/covers/${courseDetail.cover}`)


    // Show Course Sessions
    const sessionsWrapper = $.querySelector('.sessions-wrapper');
    if (courseDetail.sessions.length) {
        courseDetail.sessions.forEach((session, index) => {
            sessionsWrapper.insertAdjacentHTML('beforeend', `
                <div class="accordion-body introduction__accordion-body">
                <div class="introduction__accordion__right">
                    <span class="introduction__accordion-count">${index + 1}</span>
                    <i class="fab fa-youtube introduction__accordion-icon"></i>
                    ${
                        (session.free || courseDetail.isUserRegisteredToThisCourse) ? `
                            <a href="episode.html?name=${courseDetail.shortName}&id=${session._id}" class="introduction__accordion-link">
                                ${session.title}
                            </a>` 
                        :`
                            <span  class="introduction__accordion-link">
                                ${session.title}
                            </span>`
                    }
                </div>
                <div class="introduction__accordion__left">
                    <span class="introduction__accordion-time">${session.time}</span>
                    ${
                        !(session.free || courseDetail.isUserRegisteredToThisCourse) ? `
                            <i class="fa fa-lock introduction__accordion-icon m-0"></i>
                        ` 
                        :``
                    }
                </div>
            </div>
            `)
        })
    } else {
        sessionsWrapper.insertAdjacentHTML('beforeend', `
                <div class="accordion-body introduction__accordion-body">
                <div class="introduction__accordion__right">
                    <span class="introduction__accordion-count"> -- </span>
                    <i class="fab fa-youtube introduction__accordion-icon"></i>
                    <a href="#" class="introduction__accordion-link">
                        هنوز جلسه ای آپلود نشده
                    </a>
                </div>
                <div class="introduction__accordion__left">
                    <span class="introduction__accordion-time">00:00</span>
                </div>
                </div>
            `)
    }
}

const getAndShowRelatedCourses = async () => {
    const courseShortName = getUrlParams('name');
    const courseRelatedCoursesWrapper = document.querySelector('.course-info__courses-list');

    const res = await fetch(`http://localhost:4000/v1/courses/related/${courseShortName}`);
    const relatedCourses = await res.json();

    if (relatedCourses.length) {
        relatedCourses.forEach(course => {
            courseRelatedCoursesWrapper.insertAdjacentHTML('beforeend', `
                <li class="course-info__courses-item">
                    <a href="course.html?name=${course.shortName}" class="course-info__courses-link">
                        <img src="http://localhost:4000/courses/covers/${course.cover}" alt="Course Cover" class="course-info__courses-img">
                        <span class="course-info__courses-text">${course.name}</span>
                    </a>
                </li>
            `)
        })
    } else {}
    return relatedCourses;
}

const getSessionDetails = async () => {
    const courseShortName = getUrlParams('name');
    const sessionId = getUrlParams('id');
    const sessionVideoElem = document.querySelector('.episode-content__video');
    const courseSessionsListElem = document.querySelector('.sidebar-topics__list');

    const res = await fetch(`http://localhost:4000/v1/courses/${courseShortName}/${sessionId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    const responseData = await res.json();
    sessionVideoElem.setAttribute('src', `http://localhost:4000/courses/covers/${responseData.session.video}`);
    responseData.sessions.forEach(session => {
        courseSessionsListElem.insertAdjacentHTML('beforeend', `
            <li class="sidebar-topics__list-item">
                <div class="sidebar-topics__list-right">
                <svg class="svg-inline--fa fa-circle-play sidebar-topics__list-item-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"></path></svg>
                ${
                    session.free ? `
                        <a class="sidebar-topics__list-item-link" href="episode.html?name=${courseShortName}&id=${sessionId}">${session.title}</a>
                    ` : `
                        <span class="sidebar-topics__list-item-link">${session.title}</span>
                    `
                }
                </div>
                <div class="sidebar-topics__list-left">
                    <span class="sidebar-topics__list-item-time">${session.time}</span>
                    ${
                        !(session.free || responseData.isUserRegisteredToThisCourse) ? `
                            <i class="fa fa-lock introduction__accordion-icon m-0"></i>
                        ` 
                        :``
                    }
                </div>
            </li>
        `)
    })
    return responseData;
}

export {
    showUserNameInNavbar,
    renderTopbarMenus,
    getAndShowAllCourses,
    getAndShowPopularCourses,
    getAndShowPresellCourses,
    getAndShowArticles,
    getAndShowNavbarMenus,
    getAndShowCategoryCourses,
    inssertCourseBoxHtmlTemplate,
    coursesSorting,
    getCourseDetails,
    getAndShowRelatedCourses,
    getSessionDetails
};