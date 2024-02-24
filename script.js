const textElement = document.getElementById("clickable-mark");
let isWhite = false;

textElement.addEventListener("click", function() {
    if (isWhite) {
        const imageUrl = '/images/background.png';
        document.getElementById('background-holder').style.backgroundImage = 'url("' + imageUrl + '")';
        document.body.style.color = "black";
        isWhite = false;
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        isWhite = true;
    }
});