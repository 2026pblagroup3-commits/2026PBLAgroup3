import { login, observeAuth } from "../../firebase/auth.js";
import { initializeUser } from "../../firebase/firestore.js";

import { createHeader } from "../../components/header/header.js"
import { auth } from "../../firebase/firebase.js"

observeAuth(async (user) => {

    if (!user) return;

    await initializeUser(user);

    location.href = "../../pages/courses/";

});

document
    .getElementById("google-login")
    .addEventListener("click", async () => {

        try {

            await login();

        }
        catch (e) {

            console.error(e);

        }

});

const headerContainer =
    document.getElementById("header");

headerContainer.appendChild(

    createHeader(
        auth.currentUser
    )

);