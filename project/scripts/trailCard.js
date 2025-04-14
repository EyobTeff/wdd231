

const trailList = document.getElementById("trail-list");

async function fetchTrails() {
  try {
    const response = await fetch("data/trails.json");
    const data = await response.json();
    displayTrails(data.trails);
  } catch (error) {
    console.error("Error loading trail data:", error);
  }
}

function displayTrails(trails) {
  trails.forEach((trail) => {
    const card = document.createElement("div");
    card.classList.add("trail-card");

    card.innerHTML = `
      <img src="${trail.image}" alt="${trail.name}" loading="lazy">
      <h2>${trail.name}</h2>
      <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
      <p><strong>Distance:</strong> ${trail.distance}</p>
      <p>${trail.description}</p>
    `;

    card.addEventListener("click", () => openModal(trail));
    trailList.appendChild(card);
  });
}

function openModal(trail) {
  const modal = document.getElementById("trail-modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <h2>${trail.name}</h2>
    <img src="${trail.image}" alt="${trail.name}" loading="lazy">
    <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
    <p><strong>Distance:</strong> ${trail.distance}</p>
    <p><strong>Description:</strong> ${trail.description}</p>
  `;
  modal.classList.remove("hidden");

  document.querySelector(".close-button").onclick = () => {
    modal.classList.add("hidden");
  };
}

fetchTrails();
