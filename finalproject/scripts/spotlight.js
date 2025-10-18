//get the current year and last modified 
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburguer button 
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');

});

//---- SPOTLIGHT SECTION ----

// OPTIMIZADO: Evita re-renders y reserva espacio
const container = document.getElementById('spotlight-container');
let countries = [];
let currentSpotlight = [];
let rotationInterval;

export async function fetchCountries() {
    try {
        const response = await fetch('data/countries.json');
        if (!response.ok) throw new Error('Error al cargar los datos');
        countries = await response.json();
        
        // Renderiza contenedor vacío primero (evita CLS)
        renderEmptyCards();
        
        // Luego carga datos
        updateSpotlight();
        rotationInterval = setInterval(updateSpotlight, 8000);
    } catch (error) {
        console.error(error);
        container.innerHTML = `<p>Failed to load spotlight countries.</p>`;
    }
}

function renderEmptyCards() {
    // Reserva espacio para 4 cards (CLS fix)
    container.innerHTML = `
        <div class="spotlight-card skeleton"></div>
        <div class="spotlight-card skeleton"></div>
        <div class="spotlight-card skeleton"></div>
        <div class="spotlight-card skeleton"></div>
    `;
}

function updateSpotlight() {
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    currentSpotlight = shuffled.slice(0, 3); // ← Cambié de 4 a 3

    container.innerHTML = '';

    currentSpotlight.forEach(country => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <h3>${country.name}</h3>
            <img src="${country.img}" alt="${country.name}" width="300" height="300" loading="lazy">
            <div class="hover-info">
                <p>${country.desc}</p>
                <p><strong>Language:</strong> ${country.language}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=${country.lat},${country.lon}" target="_blank">📍 View on Map</a>
            </div>
        `;
        container.appendChild(card);
    });
}

fetchCountries();
