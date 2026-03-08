document.getElementById("login-btn").addEventListener("click", function () {
    const inputUserName = document.getElementById("input-username");
    const userNameValue = inputUserName.value;
    const inputPassword = document.getElementById("input-password");
    const passwordValue = inputPassword.value;
    if (userNameValue == "admin" && passwordValue == "admin123") {
        alert("Congratulation! Successfully Login.");
        window.location.assign("home.html");
    }
    else {
        alert("Invalid Inputs!")
    }
});