document.addEventListener("DOMContentLoaded", () => {
    // Retrieve form data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById("firstName").textContent = urlParams.get("firstName") || "N/A";
    document.getElementById("lastName").textContent = urlParams.get("lastName") || "N/A";
    document.getElementById("email").textContent = urlParams.get("email") || "N/A";
    document.getElementById("phone").textContent = urlParams.get("phone") || "N/A";
    document.getElementById("businessName").textContent = urlParams.get("businessName") || "N/A";
    document.getElementById("membershipLevel").textContent = urlParams.get("membershipLevel") || "N/A";
    document.getElementById("timestamp").textContent = urlParams.get("timestamp") || "N/A";

    // Update footer year
    document.getElementById("year").textContent = new Date().getFullYear();
});
