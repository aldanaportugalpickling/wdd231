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


const myKey = '66c6ef90f50ed28ef42520446f90f69e';

const countries = {
  india: { lat: 12.2958, lon: 76.6395 },
  italy: { lat: 41.8919, lon: 12.5113 },
  dubai: { lat: 25.0773, lon: 55.3093 },
  egypt: { lat: 30.0444, lon: 31.2357 },
  france: { lat: 48.8534, lon: 2.3488 },
  russia: { lat: 55.7558, lon: 37.6173 },
  australia: { lat: -33.8688, lon: 151.2093 },
  usa: { lat: 40.7143, lon: -74.0060 },
  norway: { lat: 59.9139, lon: 10.7522 },
  japan: { lat: 35.6895, lon: 139.6917 }
};

// Función para obtener clima por país
function fetchWeather(lat, lon, id) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data, id))
    .catch(error => console.log(error));
}

// Mostrar datos en la tarjeta correspondiente
function displayWeather(data, id) {
  document.querySelector(`#town-${id}`).textContent = data.name;
  document.querySelector(`#description-${id}`).textContent = data.weather[0].description;
  document.querySelector(`#temperature-${id}`).innerHTML = `${data.main.temp}&deg;C`;
  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.querySelector(`#graphic-${id}`).setAttribute('src', iconSrc);
  document.querySelector(`#graphic-${id}`).setAttribute('alt', data.weather[0].description);
}

// Ejecutar para todos los países
for (const id in countries) {
  const { lat, lon } = countries[id];
  fetchWeather(lat, lon, id);
}

