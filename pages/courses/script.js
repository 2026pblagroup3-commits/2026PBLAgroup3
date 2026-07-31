import { initialize } from "../../modules/app.js";

import * as CourseManager from "../../modules/courseManager.js";

import { save } from "../../firebase/userData.js";

import { createCategorySection } from "../../components/categorySection/categorySection.js";

import { createSummarySection } from "../../components/summarySection/summarySection.js";

import { createHeader } from "../../components/header/header.js";
import { auth } from "../../firebase/firebase.js";
import { waitForAuth } from "../../firebase/auth.js";

const user = await waitForAuth();
await initialize(user);

const headerContainer =
    document.getElementById("header");

headerContainer.appendChild(

    createHeader(
        user
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

const saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", async () => {
    if (!auth.currentUser) {
        location.href = "../../pages/login/";
        return;
    }

    saveButton.disabled = true;

    try {
        const saved = await save();
        saveButton.textContent = saved ? "保存しました" : "変更はありません";
    } catch (error) {
        console.error(error);
        saveButton.textContent = "保存に失敗しました";
    } finally {
        setTimeout(() => {
            saveButton.textContent = "保存";
            saveButton.disabled = false;
        }, 1500);
    }
});
