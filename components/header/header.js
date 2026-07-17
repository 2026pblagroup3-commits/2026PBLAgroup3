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

    userName.textContent =
        user?.displayName ?? "未ログイン";

    userArea.appendChild(userName);

    //--------------------------------

    header.append(
        title,
        homeArea,
        userArea
    );

    return header;

}