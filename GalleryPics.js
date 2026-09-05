//These photos are all in a single external document instead of being embedded into the main body of code for the gallery page.
//This is because I want to ensure that my website is maintanable and efficient for future.
//Whilst I now have a relatively small number of images here, I cannot be sure of what my website may become later (including scale-wise).
//Therefore, it is important to build my website as maintainably as possible from the start.
//I hope to be able to change the photos here from a JavaScript data structure to a JSON file later, as that would be more maintainable, scalable and better suited for this purpose.

window.GalleryPics = [
    "images/LightBox.jpg",
    "images/PrefectBadge.jpg",
    "images/CyberFirstBadge.png",
    "images/Rebuilding1.jpg",
    "images/Rebuilding2.jpg",
    "images/Rebuilding3.jpg",
    "images/Rebuilding4.jpg",
    "images/SeniorAward.jpg",
    "images/WOORWebinar.jpg",
    "images/EPQ1.jpg",
    "images/EPQ2.jpg",
    "images/EPQ3.jpg",
    "images/EPQFile.jpg",
    "images/MathsVid2.png",
    "images/AIDemystified.jpg",
    "images/CyberFirstProgramme.jpg",
    "images/CFWorkbook.jpg",
    "images/CFCertificate.jpg",
    "images/CFInsideStairs.jpg",
    "images/CFGroup.jpg"
];


//Extract the images from the GalleryPics JS document and identify them as being of the image class
GalleryPics.forEach(src => {
    document.querySelector(".gallery").innerHTML += `<img class="image" src="${src}">`;
});

//For every image, if it is clicked then the (otherwise hidden) modal is shown
//This centralises and enlarges the image by setting it to the id "modalImage" so it is displayed inside the modal
document.querySelectorAll(".image").forEach(img => {
    img.addEventListener("click", () => {
        document.getElementById("imageModal").style.display = "flex";
        document.getElementById("modalImage").src = img.src;
    });
});

//If the user clicks anywhere in the modal (which covers the entire screen) excluding directly on the image held there, the modal will be hidden (so the enlarged image no longer shows)
document.getElementById("imageModal").onclick = function(e) {
    if (e.target === this) {
        this.style.display = "none";
    }
};