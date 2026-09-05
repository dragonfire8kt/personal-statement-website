//CODE BELOW CONTROLS PASSWORD PROTECTION OF THE WEBSITE

//Creates two constants: one for the key that will be used to store whether the user has logged in or not, and one for the key that will be used to store the page they were on before being redirected to the password page.
const loginKey = "personalStatementLoggedIn";
const returnPageKey = "personalStatementReturnPage";

//Function to determine if the user has logged in before they are able to access any page besides the password page.
function requireLogin() {
    //Identifies the password page (shows they are allowed on this page without having logged in)
    const passwordPage = "PersonalStatementPassword.html";
    //Identifies the current page the user is on by taking the path and splitting it up by "/", then looking at the end of the path to identify the exact page of the website
    //|| identifies if the user is on the home page (as there is a different path layout for this page)
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    //If the user is on the password page or has already logged in for this session then they do not require redirecting and therefore can continue as normal
    //(can tell if the user has already logged in by using the following: sessionStorage holds temporary information about that individual browser session. .getItem(loginKey) retrieves the value from the key "personalStatementLoggedIn". If the value of this key is "true", the user has logged in during this session).
    if (currentPage === passwordPage || sessionStorage.getItem(loginKey) === "true") {
        return;
    }

    //If the user has not logged in and is not on the home page then their current page is stored in sessionStorage so that they can be redirected back after logging in (only applies if they are not on the home pagebecause they will otherwise be redirected to the home page by default after logging in).
    if (currentPage !== "index.html") {
        sessionStorage.setItem(returnPageKey, currentPage + window.location.search + window.location.hash);
    }

    //Redirects the user to the password page if they have not logged in and are not already on this page
    window.location.href = passwordPage;
}

//Runs the above function
requireLogin();

function enter() {
    //Do not cast to be a number because it does not represent a numerical value and may have preceding 0s which would otherwise be disregarded
    //Retrieves the password entered by the user and removes any whitespace
    const enteredPassword = document.getElementById("sitePassword").value.trim();

    //If the entered password is correct then they are sent an alert to tell them the password is correct
    //The loginKey changes to show that they have now logged in for this session so that they are not booted again
    if (enteredPassword === "2357") {
        alert("Correct");
       sessionStorage.setItem(loginKey, "true");

       //They return to the page they were previously on before being redirected or they return to the home page
       const returnPage = sessionStorage.getItem(returnPageKey) || "index.html";
       //Clears their previous page from sessionStorage so that they are not redirected back to it again in the future
       sessionStorage.removeItem(returnPageKey);
       window.location.href = returnPage;
       //Stops the function from continuing to run after the user has been redirected
        return;
    }

    //Sends the user an alert if they have entered the wrong password
    alert("Incorrect Password");
}