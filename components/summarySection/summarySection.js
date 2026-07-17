import * as Statistics
from "../../modules/statistics.js";

import {
    createProgressBar,
    updateProgressBar
}
from "../progressBar/progressBar.js";

export function createSummarySection() {

    const section = document.createElement("section");
    section.className = "summary-section";

    //--------------------------------
    // Header
    //--------------------------------

    const header = document.createElement("div");
    header.className = "summary-header";

    const title = document.createElement("h2");
    title.textContent = "総合";

    const fraction = document.createElement("span");
    fraction.className = "summary-fraction";

    header.append(
        title,
        fraction
    );

    //--------------------------------
    // ProgressBar
    //--------------------------------

    const progress =
        createProgressBar();

    //--------------------------------
    // 更新
    //--------------------------------

    function update() {

        const stat =
            Statistics.calculateOverall();

        fraction.textContent =
            `${stat.completed}+${stat.planned}/${stat.required}`;

        updateProgressBar(
            progress,
            stat
        );

    }

    update();

    document.addEventListener(
        "userdata-changed",
        update
    );

    //--------------------------------

    section.append(
        header,
        progress.element
    );

    return section;

}