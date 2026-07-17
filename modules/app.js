import { observeAuth } from "../firebase/auth.js";
import * as CourseManager from "./courseManager.js";
import * as UserData from "../firebase/userData.js";

let initialized = false;

/*
ログインしているユーザーを取得する
未ログインならログイン画面へ遷移する
*/
export function requireLogin() {

    return new Promise((resolve) => {

        observeAuth((user) => {

            if (!user) {

                location.href = "../../pages/login/";
                return;

            }

            resolve(user);

        });

    });

}

/* アプリケーションを初期化する */
export async function initialize() {

    if (initialized) return;

    await CourseManager.load("../../assets/courses.csv");

    await UserData.loadUserData();

    initialized = true;

}