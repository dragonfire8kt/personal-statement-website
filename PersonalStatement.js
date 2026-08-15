//Edit so actually sends data input to me
//Add in appropriate comments once finished
function sendReview() {
     alert("Your Feedback Has Been Sent");
}

//ALSO MAKE SURE DO NOT HARD CODE PASSWORD! (add in database link?)
function enter() {
    if (document.getElementById("sitePassword").value == 2357) {
        alert("Correct");
        window.open("index.html", "_self");
    }

    else {
        alert("Incorrect Password");
    }
}