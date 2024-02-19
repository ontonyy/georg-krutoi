const textElement = document.getElementById("clickable-mark");
let isWhite = false;

textElement.addEventListener("click", function() {
    if (isWhite) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        isWhite = false;
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        isWhite = true;
    }
});