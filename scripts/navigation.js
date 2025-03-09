// navigation.js
document.addEventListener("DOMContentLoaded", () => {
    const navButton = document.querySelector(".menu-button");
    const navMenu = document.querySelector(".nav-links");

    navButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });
});
