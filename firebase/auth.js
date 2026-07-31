import { auth } from "./firebase.js";

import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

/* Googleログイン */
export async function login(){

    const result = await signInWithPopup(auth, provider);

    return result.user;

}

/* ログアウト */
export async function logout(){

    await signOut(auth);

}

/* ログイン状態監視 */
export function observeAuth(callback){

    return onAuthStateChanged(auth, callback);

}

/* Firebaseの初回認証判定を待つ */
export function waitForAuth() {
    return new Promise((resolve, reject) => {
        let unsubscribe;

        unsubscribe = onAuthStateChanged(
            auth,
            user => {
                unsubscribe?.();
                resolve(user);
            },
            reject
        );
    });
}
