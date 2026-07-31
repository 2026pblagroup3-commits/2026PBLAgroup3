import * as UserData from "../../firebase/userData.js";

export function createCourseItem(course) {

    const item = document.createElement("div");
    item.className = "course-item";

    //--------------------------------
    // 授業情報
    //--------------------------------

    const info = document.createElement("div");
    info.className = "course-info";

    const name = document.createElement("div");
    name.className = "course-name";
    name.textContent = course.name;

    const detail = document.createElement("div");
    detail.className = "course-detail";
    detail.textContent = [
        course.code,
        course.category,
        `${course.year}年`,
        course.semester,
        `${course.credits}単位`
    ].join(" / ");

    info.append(name, detail);

    //--------------------------------
    // 履修状態
    //--------------------------------

    const select = document.createElement("select");
    select.className = "course-status";

    const options = [
        ["none", "未履修"],
        ["planned", "履修予定"],
        ["completed", "履修済み"]
    ];

    for (const [value, label] of options) {

        const option = document.createElement("option");

        option.value = value;
        option.textContent = label;

        select.appendChild(option);

    }

    select.value = UserData.getCourseStatus(course.code);

    select.addEventListener("change", () => {

        UserData.setCourseStatus(
            course.code,
            select.value
        );

    });

    //--------------------------------

    item.append(
        info,
        select
    );

    return item;

}
