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

//---- WETAHER ELEMENTS----

//first select the elements to the weather card

/*const myTown = document.querySelector('#town-india');
const myGraphic = document.querySelector('#graphic-india');
const myDescription = document.querySelector('#description-india');
const myTemperature = document.querySelector('#temperature-india');

//Create requied variables for the API

const myKey = '66c6ef90f50ed28ef42520446f90f69e';
const myLat = '12.295791520089704';
const myLong = '76.63954350515496';
const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

//Grab the current weather data --the code is in the assignment--

async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetch();

//display the JSON data into my web page
function displayResults(data) {
    console.log('hello')
    myTown.innerHTML = data.name;
    myDescription.innerHTML = data.weather[0].description;
    myTemperature.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    myGraphic.setAttribute('src', iconsrc);
    myGraphic.setAttribute('ALT', data.weather[0].description);
}*/

document.addEventListener('DOMContentLoaded', () => {
    const myKey = '66c6ef90f50ed28ef42520446f90f69e';
    const countriesContainer = document.getElementById('countries');
    const dialog = document.querySelector('#weatherDialog');
    const townEl = document.querySelector('#town');
    const descEl = document.querySelector('#description');
    const tempEl = document.querySelector('#temperature');
    const graphicEl = document.querySelector('#graphic');
    const closeBtn = document.querySelector('#closeDialog');
    const mapsLink = document.getElementById('mapsLink');

    // function to obtein weather using the name of city
    async function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching weather for ${city}`);
        return await response.json();
    }

    //close dialog
    closeBtn.addEventListener('click', () => dialog.close());

    //load countries JSON and create cards
    async function loadCountries() {
        try {
            const response = await fetch('data/countries.json');
            if (!response.ok) throw new Error('Error to load JSON');
            const countries = await response.json();

            countries.forEach(country => {
                const card = document.createElement('div');
                card.className = 'country-card';
                card.dataset.country = country.id;
                card.dataset.city = country.city;
                card.dataset.lat = country.lat;
                card.dataset.lon = country.lon;

                card.innerHTML = `
                <h3>${country.name}</h3>
                 <img src="${country.img}" alt="${country.name}" loading="lazy">
          
             <p>${country.desc}</p>
            <button class="learn-btn">Learn More</button>
            `;
            countriesContainer.appendChild(card);
            });

            //Assign event to learn more buttons
            document.querySelectorAll('.learn-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const parent = btn.parentElement;
                    const city = parent.dataset.city;
                    const lat = parent.dataset.lat;
                    const lon = parent.dataset.lon;

                    try {
                        const data = await fetchWeather(city);

                        townEl.textContent = data.name;
                        descEl.textContent = data.weather[0].description;
                        tempEl.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;
                        graphicEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                        graphicEl.alt = data.weather[0].description || "weather icon";

                        mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
                        mapsLink.textContent = `View ${parent.querySelector('h3').textContent} on Google Maps`;

                        dialog.showModal();
                    } catch (error) {
                        console.error('Error loading weather:', error);
                        alert('Weather data could not be loaded. Please try again.');
                    }
                });
            });

        } catch (error) {
            console.error('Error loading countries:', error);
            countriesContainer.innerHTML = `<p>Failed to load countries.</p>`;
        }

    }

    // Initialize
    loadCountries();
});
