document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.getElementById("directory");
    const toggleView = document.getElementById("toggleView");
    
    let currentView = "grid"; // Default view
    let members = []; // Store data once fetched

    async function fetchMembers() {
        const response = await fetch("data/members.json");
        members = await response.json();
        displayMembers(members, currentView);
    }

    function displayMembers(members, view) {
        directory.innerHTML = ""; // Clear previous content
        directory.className = view; // Apply correct layout

        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                <p>Membership Level: ${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
            `;
            directory.appendChild(card);
        });
    }

    toggleView.addEventListener("click", () => {
        currentView = (currentView === "grid") ? "list" : "grid"; // Toggle state
        displayMembers(members, currentView);
    });

    fetchMembers();

    // Footer updates
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});
