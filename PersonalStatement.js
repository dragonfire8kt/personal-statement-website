//CODE BELOW ORGANISES THE LAYOUT OF TOOLTIP TEXT BENEATH THE NAVIGATION BAR

//"nav" comes from the navigation bar in the html files -- these are wrapped in <nav></nav> tags
//This takes the navigation bar for each page and stores it in the constant called navigation
const navigation = document.querySelector("nav");

//The line directly below checks that the navigation bar exists before the code runs, preventing errors, especially on pages without the navigation bar
if (navigation) {
    //Sets the result of the following code to be stored in the constant called updateNavigationHeight
    const updateNavigationHeight = () => {
        //Sets the --navigation-height property (used in the shared external CSS file) to be the same as the height of the nav bar in pixels
        navigation.style.setProperty("--navigation-height", `${navigation.offsetHeight}px`);
    };

    //Calls the above function (runs immediately once the page loads)
    updateNavigationHeight();
    //Watches for changes in the navigation size - if navigation size changes, the function is run again to keep the value updated
    new ResizeObserver(updateNavigationHeight).observe(navigation);
}

//CODE BELOW CONTROLS PASSWORD PROTECTION OF THE WEBSITE

//Creates two constants: one for the key that will be used to store whether the user has logged in or not, and one for the key that will be used to store the page they were on before being redirected to the password page.
const loginKey = "personalStatementLoggedIn";
const returnPageKey = "personalStatementReturnPage";
//Hashing the password will help to keep it secure, avoiding having it written in plain text and readable to anyone through the code.
//This will help to improve the security of the website.
//It is to be noted that this is a very simple layer of security, used to demonstrate that I have considered this aspect of my website, and is not being used to properly secure confidential data.
const passwordHash = "38d0f423e4089ea4202f1c1ba576f033f05a88dab38c8d527e8699a2aad5e80a";

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

//async means that this code is asynchronous, so the function pauses until the hash result is ready to allow the rest of the program to continue running smoothly. This is important because hashing the password may take some time, so asynchronous execution will avoid blocking the rest of the program from running while this is happening.
//async allows allows the use of await.
//Takes password as a parameter, where password is the password entered by the user.
async function hashPassword(password) {
    //TextEncoder() converts the password entered by the user into an array of bytes, which is the format required for hashing.
    //This array is then stored in the constant passwordBytes.
    const passwordBytes = new TextEncoder().encode(password);
    //crypto.subtle.digest() is a built-in JavaScript function that performs cryptographic hashing. It takes two arguments: the hashing algorithm to use (in this case, "SHA-256") and the data to hash (the passwordBytes array).
    //await waits for the browser to complete the hashing operation before the function continues.
    //Before the hash result is calculated and stored in this constant, this line of code returns a Promise. This is a JavaScript object that represents that the result is still being calculated and will be available later.
    //The result of the hashing operation is stored in the constant hashBuffer once it has been calculated, which is an ArrayBuffer (an array of bytes) containing the hashed data.
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBytes);
    //Uint8Array() converts the ArrayBuffer into an array-like structure of unsigned integers (0-255 / bytes), which is easier to work with for further processing.
    //Array.from() converts this structure into a regular array, allowing the use of array methods like map().
    return Array.from(new Uint8Array(hashBuffer))
    //byte.toString(16) converts each byte to its hexadecimal representation.
    //padStart(2, "0") ensures that each byte is represented by two hexadecimal digits, adding a leading zero if necessary.
        .map(byte => byte.toString(16).padStart(2, "0"))
        //This line joins all of the two-character hexadecimal strings into one single string.
        .join("");
}

//Another function which is asynchronous, so it can pause until the hash result is ready.
async function enter() {
    //Retrieves the value entered by the user in the password input field, trims any leading or trailing whitespace, and stores it in the constant enteredPassword.
    const enteredPassword = document.getElementById("sitePassword").value.trim();

    //Calls the hashPassword function to hash the entered password and waits for the result, returning a Promise in the meantime. The hashed password is then stored in the constant enteredPasswordHash.
    const enteredPasswordHash = await hashPassword(enteredPassword);

    //If the entered password is correct then they are sent an alert to tell them the password is correct
    //The loginKey changes to show that they have now logged in for this session so that they are not booted again
    if (enteredPasswordHash === passwordHash) {
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