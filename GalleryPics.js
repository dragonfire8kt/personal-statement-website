//These photos are all in a single external document instead of being embedded into the main body of code for the gallery page.
//This is because I want to ensure that my website is maintanable and efficient for future.
//Whilst I now have a relatively small number of images here, I cannot be sure of what my website may become later (including scale-wise).
//Therefore, it is important to build my website as maintainably as possible from the start.
//I hope to be able to change the photos here from a JavaScript data structure to a JSON file later, as that would be more maintainable, scalable and better suited for this purpose.

window.GalleryPics = [
    //This stores each gallery item like an object with a source and description
    {src:"images/LightBox.jpg", description:"The box containing the circuit, controls and Arduino microcontroller for my LED light strip, as shown connected to the light strip. I programmed the microcontroller using C++."},
    {src:"images/PrefectBadge.jpg", description:"My Computer Science Prefect Badge."},
    {src:"images/CyberFirstBadge.png", description:"I have two of these badges, one for being a CyberFirst Student Ambassador, and another for attending NCSC's CyberFirst Advanced Course."},
    {src:"images/Rebuilding1.jpg", description:"A progress photo taken when I disassembled two PCs, selecting the best parts to then rebuild into one."},
    {src:"images/Rebuilding2.jpg", description:"A progress photo taken when I disassembled two PCs, selecting the best parts to then rebuild into one."},
    {src:"images/Rebuilding3.jpg", description:"A progress photo taken when I disassembled two PCs, selecting the best parts to then rebuild into one."},
    {src:"images/Rebuilding4.jpg", description:"The final, rebuilt Computer from the rebuilding project."},
    {src:"images/SeniorAward.jpg", description:"My Senior Award which was presented to me to commend my work within and dedication towards Computer Science, including my activities as a subject Prefect and CyberFirst Student Ambassador."},
    {src:"images/EPQ1.jpg", description:"An image taken during my EPQ presentation."},
    {src:"images/EPQ2.jpg", description:"An image taken during my EPQ presentation."},
    {src:"images/EPQ3.jpg", description:"An image taken during my EPQ presentation."},
    {src:"images/EPQFile.jpg", description:"A photo of my final EPQ hand-in file."},
    {src:"images/MathsVid2.png", description:"A screenshot from 3Blue1Brown's “Compression is Intelligence” series."},
    {src:"images/AIDemystified.jpg", description:"A photo of my copy of AI Demystified by Antonio Weiss: whilst this book is not mentioned in my Personal Statement, it helped to inform my use of AI in the creation of this website."},
    {src:"images/CyberFirstProgramme.jpg", description:"A screenshot from the CyberFirst programme."},
    {src:"images/CFWorkbook.jpg", description:"The workbook of information I was given for NCSC's CyberFirst Advanced Course."},
    {src:"images/CFCertificate.jpg", description:"The certificate I was presented with at the end of NCSC's CyberFirst Advanced Course. I also recieved an additional notepad and pen which only a few students within the course were given to acknowledge students with particular dedication to the course's activities."},
    {src:"images/CFInsideStairs.jpg", description:"Friends I made during NCSC's CyberFirst Advanced Course."},
    {src:"images/CFGroup.jpg", description:"The group of students and professors taking part in NCSC's CyberFirst Advanced Course at my chosen location (UWE Bristol)."}
];

//.forEach() iterates through every item in the GalleryPics array
//Takes two parameters (picture = the current item / index = the index of that item in the array)
//=> Starts the code that runs for each item
GalleryPics.forEach((picture, index) => {
    //.querySelector(".gallery") finds and selects the first element within the gallery class (a div) and .innerHTML accesses the HTML content of that element
    //For this HTML element, the image referenced in the current item of the GalleryPics array is appended (a new image tag is created and put inside the gallery div)
    //alt text is also added to each image as a numerical count from 1
    //data-gallery-index="${index}" stores each image's array index as a data attribute of that image tag so that the image's description can be accessed later if the image is clicked on
    document.querySelector(".gallery").innerHTML += `<img class="image" src="${picture.src}" alt="Gallery image ${index + 1}" data-gallery-index="${index}">`;
});

document.querySelectorAll(".image").forEach(img => {
    //Line below constantly checks to see if any image is clicked on
    img.addEventListener("click", () => {
        //The object (from the GalleryPics array) of the image clicked on is stored in the constant called picture 
        const picture = GalleryPics[img.dataset.galleryIndex];
        const modalImage = document.getElementById("modalImage");
        const modalPanel = document.querySelector(".modalPanel");
        //Clears any existing value of the modalPanel's width so that future enlarged images are not restricted by the widths of previous enlarged images
        modalPanel.style.width = "";
        //The modal is set to display as a flexbox so that it is shown on the screen instead of being hidden
        document.getElementById("imageModal").style.display = "flex";
        //The image inside the modal is set to be the image that was clicked on
        modalImage.src = img.src;
        //The text content of the object's description is set to be shown in the modal along with the enlarged accompanying image
        document.getElementById("modalDescription").textContent = picture.description;

        //This function is called once an enlarged image has loaded on the page, and sets the text description of this enlarged image to the same width as that image
        //const is used to store the function because it allows for the function to be referred to but not run immediately, which is needed for the event listener as part of the later if-else statement (so it can run the function later when the image finished loading)
        const setDescriptionWidth = () => {
            //modalImage.getBoundingClientRect() measures the dimensions of the enlarged image, and this is specified here to be done in pixels (string 'px' added to the end to clarify this)
            //modalPanel.style.width sets the width of the panel containing the enlarged image and its description to be the same width as the image, effectively causing the description to be the same width as the image
            modalPanel.style.width = `${modalImage.getBoundingClientRect().width}px`;
        };

        //The images final displayed width cannot be measured until the image has fully loaded
        //Once the image has loaded on the screen, the description is set to the same width as the image using the above function
        if (modalImage.complete) {
            setDescriptionWidth();
        //If the image has not loaded yet, the program waits for the image to load by using an Event Listener
        //The listener runs the above function (setDescriptionWidth) and removes itself once the image has loaded ({once: true})
        } else {
            modalImage.addEventListener("load", setDescriptionWidth, {once: true});
        }
    });
});

//If the user clicks anywhere in the modal (which covers the entire screen) excluding directly on the image held there, the modal will be hidden (so the enlarged image and description no longer shows)
document.getElementById("imageModal").onclick = function(e) {
    if (e.target === this) {
        this.style.display = "none";
    }
};