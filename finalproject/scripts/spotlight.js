const container = document.getElementById('spotlight-container');
let countries = [];


export async function fetchCountries() {
  try {
    const response = await fetch('scripts/countries.json');
    if (!response.ok) throw new Error('Error al cargar los datos');
    countries = await response.json();
    updateSpotlight(); // mostrar los primeros 4
    setInterval(updateSpotlight, 8000); // cambiar cada 8 segundos
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p>Failed to load spotlight countries.</p>`;
  }
}

function updateSpotlight() {
  container.innerHTML = ''; // limpiar el contenido actual

  // Barajar y elegir 4 aleatorios distintos
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
