import { renderCourseList }
from "../courseList/courseList.js";

import * as Statistics
from "../../modules/statistics.js";

import {createProgressBar, updateProgressBar}from "../progressBar/progressBar.js";

export function createCategorySection(category, courses){

    const section = document.createElement("section");
    section.className = "category-section";

    //--------------------------------
    // Header
    //--------------------------------

    const header = document.createElement("div");
    header.className = "category-header";

    let expanded = false;

    const title = document.createElement("div");
    title.className = "category-title";

    const arrow = document.createElement("span");
    arrow.textContent = "▼";

    const text = document.createElement("span");
    text.textContent = category;

    title.append(
        arrow,
        text
    );

    const fraction = document.createElement("span");
    fraction.className = "category-fraction";

    header.append(title, fraction);

    //--------------------------------
    // ProgressBar
    //--------------------------------

    const progress = createProgressBar();
    progress.className = "category-progress";

    const summary = document.createElement("div");
    summary.className = "category-summary";

    summary.append(
        header,
        progress.element
    );

    //--------------------------------
    // CourseList
    //--------------------------------

    const list = document.createElement("div");
    list.className = "course-list";

    renderCourseList(list, courses);

    //--------------------------------
    // 更新関数
    //--------------------------------

    function update(){

        const stat =
            Statistics.calculateCategory(category);

        fraction.textContent =
            `${stat.completed}+${stat.planned}/${stat.required}`;

        updateProgressBar(progress, stat);
    }

    update();

    document.addEventListener(

        "userdata-changed",

        update

    );

    function updateExpanded(){

        list.style.display =
            expanded ? "" : "none";

        arrow.textContent =
            expanded ? "▼" : "▶";

    }

    summary.addEventListener("click", ()=>{

        expanded = !expanded;

        updateExpanded();

    });

    updateExpanded();

    //--------------------------------

    section.append(
        summary,
        list
    );

    return section;

}