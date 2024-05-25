const texts = [
    "L'algorithme de Ford-Fulkerson",
    "Il est utilisé pour trouver le chemin le plus court.",
    "En utilisant l'algorithme de minimisation.",
    "Ou bien le chemin le plus long.",
    "En utilisant l'algorithme de maximisation."
];
const typingContainer = document.getElementById("typing-container");
let currentTextIndex = 0;
let currentText = "";
let isDeleting = false;
let typingSpeed = 100; // Adjust the typing speed (milliseconds per character)

function type() {
    const text = texts[currentTextIndex];
    if (isDeleting) {
        currentText = text.substring(0, currentText.length - 1);
    } else {
        currentText = text.substring(0, currentText.length + 1);
    }

    typingContainer.innerHTML = currentText;

    let typingDelay = isDeleting ? typingSpeed / 2 : typingSpeed;

    if (!isDeleting && currentText === text) {
        typingDelay = 1500; // Pause after typing
        isDeleting = true;
    } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentTextIndex++;
        if (currentTextIndex === texts.length) {
            currentTextIndex = 0;
        }
    }

    setTimeout(type, typingDelay);
}

document.addEventListener("DOMContentLoaded", function () {
    type();
});