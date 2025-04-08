document.addEventListener("DOMContentLoaded", () => {
  const interestCards = document.getElementById("interest-cards");

  fetch("data/interest.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(place => {
        const card = document.createElement("section");
        card.classList.add("interest-card");

        card.innerHTML = `
          <h2>${place.name}</h2>
          <figure>
            <img src="images/${place.image}" alt="${place.name}">
          </figure>
          <address>${place.address}</address>
          <p>${place.description}</p>
          <button>Learn More</button>
        `;

        interestCards.appendChild(card);
      });
    });

  // localStorage visitor message
  const sidebar = document.createElement("aside");
  sidebar.classList.add("visitor-message");

  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysPassed < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysPassed === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysPassed} days ago.`;
    }
  }

  sidebar.textContent = message;
  document.querySelector("main").prepend(sidebar);
  localStorage.setItem("lastVisit", now);
});
