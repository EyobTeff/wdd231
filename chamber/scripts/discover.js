document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.getElementById("interest-cards");
  
    fetch("data/interest.json")
      .then(res => res.json())
      .then(data => {
        data.forEach((item, index) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.style.gridArea = `card${index + 1}`;
          card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
              <img src="${item.image}" alt="${item.title}">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
          `;
          cardsContainer.appendChild(card);
        });
      });
  
    // localStorage visit message
    const visitArea = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
  
    if (!lastVisit) {
      visitArea.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysSince = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
      visitArea.textContent =
        daysSince < 1
          ? "Back so soon! Awesome!"
          : `You last visited ${daysSince} ${daysSince === 1 ? "day" : "days"} ago.`;
    }
  
    localStorage.setItem("lastVisit", now.toString());
  });
  