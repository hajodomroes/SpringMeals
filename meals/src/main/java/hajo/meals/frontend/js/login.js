    function closeLoginForm() {
        document.getElementById("loginForm").style.display = "none";
    }

    function changeLoginStatus() {
        var profileIcon = document.getElementById("loginStatus");
        profileIcon.classList.toggle("bi-person-fill-lock");
        profileIcon.classList.toggle("bi-person-check-fill");

        document.getElementById("loginForm").style.display = "block";

        var loginAlert = $("#login-alert");
        var loginText = document.getElementById("login-text");
        if (profileIcon.classList.contains("bi-person-fill-lock")) {
            loginText.innerHTML = "logout successful";
            loginAlert.fadeIn(1000);
            loginAlert.fadeOut(3000);
        } else if (profileIcon.classList.contains("bi-person-check-fill")) {
            loginText.innerHTML = "login successful";
            loginAlert.fadeIn(1000);
            loginAlert.fadeOut(3000);
        }

    }

    function closeLoginAlert() {
        var loginAlert = document.getElementById("login-alert");
        loginAlert.style.display = "none";
    }


    function toggleBlur() {
        var shoppingList = document.getElementById("shoppingList");
        shoppingList.classList.toggle("fullscreen-container");
        var shoppingList = document.getElementById("shoppingList");
        if (shoppingList.style.display = "block") {
        shoppingList.style.display = "none";
        }
    }