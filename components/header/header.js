import { logout, observeAuth } from "../../firebase/auth.js";

export function createHeader(user) {

    const header = document.createElement("header");
    header.className = "app-header";

    //--------------------------------
    // App Title
    //--------------------------------

    const title = document.createElement("h1");
    title.className = "app-title";

    title.textContent = "履修登録チェッカー";

    //--------------------------------
    // Home
    //--------------------------------

    const homeArea = document.createElement("div");
    homeArea.className = "app-home";

    const homeName = document.createElement("span");
    homeName.className = "app-home-name";

    homeName.textContent = "ホーム";

    homeArea.addEventListener("click", async () => {
    
        location.href = "../home/"

        }
    );

    homeArea.appendChild(homeName);

    //--------------------------------
    // User
    //--------------------------------

    const userArea = document.createElement("div");
    userArea.className = "app-user";

    const userName = document.createElement("span");
    userName.className = "app-user-name";

    const logoutButton = document.createElement("button");
    logoutButton.className = "app-logout";
    logoutButton.type = "button";
    logoutButton.textContent = "ログアウト";

    logoutButton.addEventListener("click", async () => {
        logoutButton.disabled = true;

        try {
            await logout();
            location.href = "../login/";
        } catch (error) {
            console.error(error);
            logoutButton.disabled = false;
        }
    });

    function updateUser(currentUser) {
        userName.textContent = currentUser?.displayName ?? "デモ利用中";
        userArea.replaceChildren(userName);

        if (currentUser) {
            userArea.appendChild(logoutButton);
        }
    }

    updateUser(user);
    observeAuth(updateUser);

    //--------------------------------

    header.append(
        title,
        homeArea,
        userArea
    );

    return header;

}
