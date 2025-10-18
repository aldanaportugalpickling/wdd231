const funFactsContainer = document.getElementById('fun-facts');

fetch('data/countries.json')
  .then(response => response.json())
  .then(countries => {
    countries.forEach(country => {
      const card = document.createElement('div');
      card.classList.add('fun-card');
      card.innerHTML = `
        <div class="image" style="background-image: url(${country.img});"></div>
        <div class="overlay">
          <h3>${country.name}</h3>
          <p>${country.funFact || 'A fascinating place full of stories to tell.'}</p>
        </div>
      `;
      funFactsContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading fun facts:', error));
