// Set the current year dynamically
document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Display last modified date
document.querySelector("#lastModified").textContent = `Last Update: ${document.lastModified}`;
