document.addEventListener("DOMContentLoaded", () => {
    // Set current timestamp
    document.getElementById("timestamp").value = new Date().toISOString();

    // Setup mobile navigation
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }

    // Handle modals
    const modalLinks = document.querySelectorAll(".modal-link");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");

    modalLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const modalId = event.target.dataset.modal;
            document.getElementById(modalId).style.display = "block";
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // Update footer year
    document.getElementById("year").textContent = new Date().getFullYear();
});
