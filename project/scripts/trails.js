
const trailList = document.getElementById('trail-list');
const modal = document.getElementById('trail-modal');
const modalBody = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-button');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function renderTrailCard(trail) {
  const card = document.createElement('div');
  card.className = 'trail-card';
  card.innerHTML = `
    <img src="${trail.image}" alt="${trail.name}" loading="lazy" />
    <h2>${trail.name}</h2>
    <p>${trail.difficulty} | ${trail.length}</p>
    <button class="view-details">Details</button>
    <button class="favorite-btn">${favorites.includes(trail.name) ? '★ Saved' : '☆ Save'}</button>
  `;

  // Open modal
  card.querySelector('.view-details').addEventListener('click', () => {
    modalBody.innerHTML = `
      <h2>${trail.name}</h2>
      <p><strong>Location:</strong> ${trail.location}</p>
      <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
      <p><strong>Length:</strong> ${trail.length}</p>
      <p>${trail.description}</p>
    `;
    modal.classList.remove('hidden');
  });

  // Save to localStorage
  card.querySelector('.favorite-btn').addEventListener('click', () => {
    if (!favorites.includes(trail.name)) {
      favorites.push(trail.name);
    } else {
      favorites = favorites.filter(name => name !== trail.name);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderTrails(); 
  });

  return card;
}

function renderTrails() {
  trailList.innerHTML = '';
  fetch('data/trails.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(trail => {
        trailList.appendChild(renderTrailCard(trail));
      });
    })
    .catch(err => console.error('Error loading trails:', err));
}

closeButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', renderTrails);
