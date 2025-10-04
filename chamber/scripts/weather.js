//Get day and time
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

//Display Hamburger buttom
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

// Elementos del clima
const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const figCaption = document.querySelector('figcaption');

// API  OpenWeather
const myKey = "66c6ef90f50ed28ef42520446f90f69e";
const myLat = "-3.7480872947615325";
const myLong = "-73.25991707321536";
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

// Get wetaher datas
async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log("Error al obtener datos del clima:", error);
  }
}

// Display JSON data
function displayResults(data) {
  myTown.textContent = data.name;
  myDescription.textContent = data.weather[0].description;
  myTemperature.textContent = `${data.main.temp} °C`;
  currentTemp.textContent = `${data.main.temp} °C`;
  weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute('alt', data.weather[0].description);
  figCaption.textContent = data.weather[0].description;
}

// Iniciar
apiFetch();



//-----

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log("Error al obtener el pronóstico:", error);
  }
}

function displayForecast(data) {
  const container = document.querySelector("#forecast-container");
  container.innerHTML = ""; // Limpiar contenido anterior

  // Filtrar solo una entrada por día (al mediodía)
  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyForecasts.slice(0, 3).forEach(forecast => {
    const date = new Date(forecast.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const temp = Math.round(forecast.main.temp);

    const forecastText = document.createElement("p");
    forecastText.textContent = `${dayName}: ${temp} °C`;
    container.appendChild(forecastText);
  });
}

// Llamar a la función
getForecast();

