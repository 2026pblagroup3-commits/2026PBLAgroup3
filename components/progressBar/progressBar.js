export function createProgressBar() {

    const bar = document.createElement("div");
    bar.className = "progress-bar";

    const completed = document.createElement("div");
    completed.className = "progress-completed";

    const planned = document.createElement("div");
    planned.className = "progress-planned";

    const remaining = document.createElement("div");
    remaining.className = "progress-remaining";

    bar.append(
        completed,
        planned,
        remaining
    );

    return {
        element: bar,
        completed,
        planned,
        remaining
    };

}

export function updateProgressBar(bar, stat){

    const completed =
        Math.min(
            stat.completed,
            stat.required
        );

    const planned =
        Math.min(
            stat.planned,
            stat.required - completed
        );

    const remaining =
        Math.max(
            stat.required
            - completed
            - planned,
            0
        );

    bar.completed.style.flex = completed;

    bar.planned.style.flex = planned;

    bar.remaining.style.flex = remaining;

}