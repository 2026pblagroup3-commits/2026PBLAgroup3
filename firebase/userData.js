import { auth } from "./firebase.js";
import { fetchUserData, saveUserData } from "./firestore.js";

let userData = null;

let dirty = false;
const COURSE_STATUSES = new Set(["planned", "completed"]);

/* データ更新イベント */
function notifyUpdate() {

    document.dispatchEvent(
        new CustomEvent("userdata-changed")
    );

}

/* Firestoreから読み込む */
export async function loadUserData(uid = null) {
    userData = uid
        ? await fetchUserData(uid)
        : { courses: {} };

    if (userData == null) {

        userData = {
            courses: {}
        };

    }

    userData.courses ??= {};

    dirty = false;

    notifyUpdate();

}

/* 現在のデータを取得 */
export function getUserData() {

    return userData;

}

/* 変更があるか */
export function isDirty() {

    return dirty;

}

/* 科目情報を設定 */
export function setCourse(code, status) {
    setCourseStatus(code, status);
}

/* 状態変更 */
export function setCourseStatus(code, status) {

    if (status === "none") {
        deleteCourse(code);
        return;
    }

    if (!COURSE_STATUSES.has(status)) {
        throw new Error(`不正な履修状態です: ${status}`);
    }

    if (getCourseStatus(code) === status) return;

    userData.courses[code] = {
        status
    };

    dirty = true;

    notifyUpdate();

}

export function getCourseStatus(code) {

    const course = getCourse(code);

    if (!course) return "none";

    return course.status;

}

/* 科目情報取得 */
export function getCourse(code) {

    if(!userData) return null;

    return userData.courses[code] ?? null;

}

/* 全科目取得 */
export function getCourses() {
    return userData?.courses ?? {};

}

/* 科目削除 */
export function deleteCourse(code) {
    if (!getCourse(code)) return;

    delete userData.courses[code];

    dirty = true;

    notifyUpdate();
}

/* Firestoreへ保存 */
export async function save() {
    if (!dirty) return false;

    if (!auth.currentUser) {
        throw new Error("保存するにはログインが必要です");
    }

    await saveUserData(
        auth.currentUser.uid,
        userData
    );

    dirty = false;
    return true;
}
