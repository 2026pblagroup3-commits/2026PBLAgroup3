import { CATEGORY_ORDER } from "../assets/categoryOrder.js";

let courses = {};

/* CSV読込 */
export async function load(path = "../../assets/courses.csv") {

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
    }

    const text = await response.text();

    parseCSV(text);

}

/* CSV解析 */
function parseCSV(csv) {

    courses = {};

    const lines = csv.trim().split(/\r?\n/);

    for (let i = 1; i < lines.length; i++) {

        const [
            code,
            name,
            category,
            year,
            semester,
            credits
        ] = lines[i].split(",");

        courses[code] = {
            code,
            name,
            category,
            year: Number(year),
            semester,
            credits: Number(credits)
        };
    }

}

export function get(code) {

    return courses[code] ?? null;

}

export function has(code) {

    return code in courses;

}

export function getAll() {

    return Object.values(courses);

}

export function size() {

    return Object.keys(courses).length;

}

export function filter(predicate) {

    return getAll().filter(predicate);

}

export function filterByYear(year) {

    return filter(course => course.year === year);

}

export function filterBySemester(semester) {

    return filter(course => course.semester === semester);

}

export function filterByCategory(category) {

    return filter(course => course.category === category);

}

export function search(keyword) {

    return filter(course =>
        course.name.includes(keyword)
    );

}

export function getCategories() {

    const categories = [

        ...new Set(

            getAll().map(
                course => course.category
            )

        )

    ];

    categories.sort(

        (a, b) =>

        CATEGORY_ORDER.indexOf(a)
        -
        CATEGORY_ORDER.indexOf(b)

    );

    return categories;

}

export function getCoursesByCategory(category) {

    return getAll()
        .filter(course => course.category === category)
        .sort((a, b) => Number(a.code) - Number(b.code));

}

export function getTotalCredits(category) {

    return getCoursesByCategory(category)
        .reduce(
            (sum, course) => sum + course.credits,
            0
        );

}