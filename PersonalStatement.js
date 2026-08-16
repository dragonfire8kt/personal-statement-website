//Edit so actually sends data input to me
//Add in appropriate comments once finished
function sendReview() {
     alert("Your Feedback Has Been Sent");
}

//ALSO MAKE SURE DO NOT HARD CODE PASSWORD! (add in database link?)
function enter() {
    const enteredPassword = Number(document.getElementById("sitePassword").value);

    if (enteredPassword === 2357) {
        alert("Correct");
        window.location.href = "index.html";
        //if the password is correct, the return line means that the function is immediately exited, preventing further lines of code from running unless the password is incorrect
        //This has the same purpose as a following else statement but is clearner
        return;
    }

    alert("Incorrect Password");
}