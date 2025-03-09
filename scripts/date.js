// date.js
document.addEventListener("DOMContentLoaded", () => {
    // Set current year dynamically
    document.querySelector("#currentyear").textContent = new Date().getFullYear();

    // Set last modified date dynamically
    document.querySelector("#lastModified").textContent = document.lastModified;
});
