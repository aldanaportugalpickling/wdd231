const container = document.getElementById('spotlight-container');

async function loadSpotlight() {
  try {
    const response = await fetch('scripts/countries.json');
    if (!response.ok) throw new Error('Error al cargar los datos');
    const countries = await response.json();

    // Elegir 4 aleatorios
    const spotlight = countries.sort(() => 0.5 - Math.random()).slice(0, 4);

    spotlight.forEach(country => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      card.innerHTML = `
        <img src="${country.img}" alt="${country.name}" loading="lazy">
        <h3>${country.name}</h3>
        <p>${country.desc}</p>
        <div class="hover-info">
          <p>Language: ${country.language}</p>
          <p>${country.desc}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${country.lat},${country.lon}" target="_blank">View on Google Maps</a>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = `<p>Failed to load spotlight countries.</p>`;
  }
}

loadSpotlight();
