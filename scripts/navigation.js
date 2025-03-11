document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const navMenu = document.querySelector("nav ul");

    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("show"); // Toggle mobile menu visibility
    });

    // Wayfinding: Highlight the active page link
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active"); // Add active styling
        }
    });
});
