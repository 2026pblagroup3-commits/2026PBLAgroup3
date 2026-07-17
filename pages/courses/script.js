import { requireLogin, initialize } from "../../modules/app.js";

import * as CourseManager from "../../modules/courseManager.js";

import { renderCourseList } from "../../components/courseList/courseList.js";

import { save } from "../../firebase/userData.js";
import * as UserData from "../../firebase/userData.js";

import { createCategorySection } from "../../components/categorySection/categorySection.js";

import { createSummarySection } from "../../components/summarySection/summarySection.js";

import { createHeader } from "../../components/header/header.js"
import { auth } from "../../firebase/firebase.js"

await requireLogin();

await initialize();

console.log(CourseManager.getAll());
console.log(UserData.getUserData());

const headerContainer =
    document.getElementById("header");

headerContainer.appendChild(

    createHeader(
        auth.currentUser
    )

);

const container =
    document.getElementById("course-container");

container.replaceChildren();

container.appendChild(createSummarySection());

const categories = CourseManager.getCategories();

for(const category of categories){

    const courses =
        CourseManager.getCoursesByCategory(category);

    container.appendChild(

        createCategorySection(
            category,
            courses
        )

    );

}

document
.getElementById("save-button")
.addEventListener(
    "click",
    save
);