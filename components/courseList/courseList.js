import { createCourseItem }
from "../courseItem/courseItem.js";

export function renderCourseList(parent, courses) {

    parent.replaceChildren();

    for (const course of courses) {

        parent.appendChild(
            createCourseItem(course)
        );

    }

}