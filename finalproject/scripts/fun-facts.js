// Año y last modified
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Menu hamburguesa
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

// Cargar Fun Facts desde JSON
document.addEventListener('DOMContentLoaded', () => {
  const funContainer = document.getElementById('fun-facts');

  async function loadFunFacts() {
    try {
      const response = await fetch('data/countries.json');
      if (!response.ok) throw new Error('Error loading countries');
      const countries = await response.json();

      countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'fun-card';
        card.innerHTML = `
          <h3>${country.name} ${country.emoji || ''}</h3>
          <p>${country.funFact}</p>
        `;
        funContainer.appendChild(card);
      });
    } catch (error) {
      funContainer.innerHTML = '<p>Failed to load fun facts.</p>';
      console.error(error);
    }
  }

  loadFunFacts();
});
