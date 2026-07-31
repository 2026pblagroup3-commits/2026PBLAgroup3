import * as CourseManager from "./courseManager.js";
import * as UserData from "../firebase/userData.js";

let initialization = null;

/* アプリケーションを初期化する */
export async function initialize(user = null) {
    if (!initialization) {
        initialization = Promise.all([
            CourseManager.load("../../assets/courses.csv"),
            UserData.loadUserData(user?.uid)
        ]).catch(error => {
            initialization = null;
            throw error;
        });
    }

    await initialization;
}
