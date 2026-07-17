import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCAEiR3UgYoCz3xCuP39NjgRsO6BDfo3NY",
    authDomain: "pbla-d3351.firebaseapp.com",
    projectId: "pbla-d3351",
    storageBucket: "pbla-d3351.firebasestorage.app",
    messagingSenderId: "576526333548",
    appId: "1:576526333548:web:3e12256f2f79d1c96e0a49"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
