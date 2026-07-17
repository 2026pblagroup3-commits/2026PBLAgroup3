import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* 初回ログイン時のみユーザー作成 */
export async function initializeUser(user) {

    const userRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) return;

    await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: serverTimestamp(),
        courses: {}
    });

}

/* Firestoreから取得 */
export async function fetchUserData(uid) {

    const userRef = doc(db, "users", uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data();

}

/* Firestoreへ保存 */
export async function saveUserData(uid, data) {

    const userRef = doc(db, "users", uid);

    await setDoc(userRef, data);

}