import * as CourseManager from "./courseManager.js";
import * as UserData from "../firebase/userData.js";
import { REQUIREMENTS } from "../assets/requirements.js";

function summarizeCourses(courses) {
    return courses.reduce((summary, course) => {
        const status = UserData.getCourseStatus(course.code);

        if (status === "completed") summary.completed += course.credits;
        if (status === "planned") summary.planned += course.credits;

        return summary;
    }, { completed: 0, planned: 0 });
}

function createStatistics(completed, planned, required) {
    const countedCompleted = Math.min(completed, required);
    const countedPlanned = Math.min(
        planned,
        Math.max(required - countedCompleted, 0)
    );

    return {
        completed,
        planned,
        required,
        progress: required === 0
            ? 0
            : (countedCompleted + countedPlanned) / required
    };
}

export function calculateCategory(category) {
    const { completed, planned } = summarizeCourses(
        CourseManager.getCoursesByCategory(category)
    );

    return createStatistics(completed, planned, REQUIREMENTS[category] ?? 0);
}

export function calculateOverall() {
    const total = CourseManager.getCategories()
        .map(calculateCategory)
        .reduce((result, stat) => {
            const completed = Math.min(stat.completed, stat.required);
            const planned = Math.min(
                stat.planned,
                Math.max(stat.required - completed, 0)
            );

            result.completed += completed;
            result.planned += planned;
            result.required += stat.required;
            return result;
        }, { completed: 0, planned: 0, required: 0 });

    return createStatistics(total.completed, total.planned, total.required);
}
