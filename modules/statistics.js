import * as CourseManager from "./courseManager.js";
import * as UserData from "../firebase/userData.js";

import { REQUIREMENTS } from "../assets/requirements.js";

export function calculateCategory(category) {

    let completed = 0;
    let planned = 0;

    const courses =
        CourseManager.getCoursesByCategory(category);

    for (const course of courses) {

        const data =
            UserData.getCourse(course.code);

        if (!data) continue;

        switch (data.status) {

            case "completed":
                completed += course.credits;
                break;

            case "planned":
                planned += course.credits;
                break;

        }

    }

    const required =
        REQUIREMENTS[category] ?? 0;

    return {

        completed,

        planned,

        required,

        progress:

            Math.min(

                (completed + planned)
                / required,

                1

            )

    };

}

export function calculateOverall() {

    let completed = 0;
    let planned = 0;
    let required = 0;

    for (const category of CourseManager.getCategories()) {

        const stat = calculateCategory(category);

        completed += Math.min(
            stat.completed,
            stat.required
        );

        planned += Math.min(
            stat.planned,
            stat.required - Math.min(stat.completed, stat.required)
        );

        required += stat.required;

    }

    return {

        completed,

        planned,

        required,

        progress:
            required === 0
                ? 0
                : (completed + planned) / required

    };

}