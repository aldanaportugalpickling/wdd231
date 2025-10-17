const container = document.getElementById('spotlight-container');
let countries = [];


export async function fetchCountries() {
    try {
        const response = await fetch('data/countries.json');
        if (!response.ok) throw new Error('Error al cargar los datos');
        countries = await response.json();
        updateSpotlight(); // show the first 4 countries
        setInterval(updateSpotlight, 8000); // change every 8 seconds
    } catch (error) {
        console.error(error);
        container.innerHTML = `<p>Failed to load spotlight countries.</p>`;
    }
}

function updateSpotlight() {
    container.innerHTML = ''; // clean the current content

    // Shuffle and pick 4 distinct random items
    const shuffled = countries.sort(() => Math.random() - 0.5);
    const spotlight = shuffled.slice(0, 4);

    spotlight.forEach(country => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
      <img src="${country.img}" alt="${country.name}" loading="lazy">
      <div class="hover-info">
        <h3>${country.name}</h3>
        <p>${country.desc}</p>
        <p><strong>Language:</strong> ${country.language}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${country.lat},${country.lon}" target="_blank">📍 View on Map</a>
      </div>
    `;
        container.appendChild(card);
    });
}

fetchCountries();
