import { createHeader } from "../../components/header/header.js"
import { auth } from "../../firebase/firebase.js"

const headerContainer =
    document.getElementById("header");

headerContainer.appendChild(

    createHeader(
        auth.currentUser
    )

);

document
    .getElementById("start-button")
    .addEventListener("click", async () => {

        location.href = "../../pages/courses/";

});