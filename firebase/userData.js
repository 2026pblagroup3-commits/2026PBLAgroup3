import { auth } from "./firebase.js";
import { fetchUserData, saveUserData } from "./firestore.js";

let userData = null;

let dirty = false;

/* データ更新イベント */
function notifyUpdate() {

    document.dispatchEvent(
        new CustomEvent("userdata-changed")
    );

}

/* Firestoreから読み込む */
export async function loadUserData() {

    const uid = auth.currentUser.uid;

    userData = await fetchUserData(uid);

    if (userData == null) {

        userData = {
            courses: {}
        };

    }

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

    userData.courses[code] = {
        status
    };

    dirty = true;

}

/* 状態変更 */
export function setCourseStatus(code, status) {

    if (status === "none") {

        deleteCourse(code);
        return;

    }

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

    return userData.courses;

}

/* 科目削除 */
export function deleteCourse(code) {

    delete userData.courses[code];

    dirty = true;

    notifyUpdate();
}

/* Firestoreへ保存 */
export async function save() {

    if (!dirty) return;

    await saveUserData(
        auth.currentUser.uid,
        userData
    );

    dirty = false;

}