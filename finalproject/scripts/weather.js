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

const dialog = document.querySelector('#weatherDialog');
const townEl = document.querySelector('#town');
const descEl = document.querySelector('#description');
const tempEl = document.querySelector('#temperature');
const graphicEl = document.querySelector('#graphic');
const closeBtn = document.querySelector('#closeDialog');

function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=metric`;
  return fetch(url).then(res => res.json());
}

document.querySelectorAll('.learn-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const countryId = btn.parentElement.dataset.country;
    const { lat, lon } = countries[countryId];
    const data = await fetchWeather(lat, lon);

    townEl.textContent = data.name;
    descEl.textContent = data.weather[0].description;
    tempEl.innerHTML = `${data.main.temp}&deg;C`;
    graphicEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    graphicEl.alt = data.weather[0].description;
      
    
      //open location in google maps
      
    const mapsLink = document.getElementById('mapsLink');
    mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    mapsLink.textContent = `View ${data.name} on Google Maps`;
      

    dialog.showModal();
  });
});

// Cerrar diálogo
closeBtn.addEventListener('click', () => dialog.close());


