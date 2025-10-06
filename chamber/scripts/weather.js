// Fecha actual y última modificación
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Botón hamburguesa
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

// Elementos del clima
const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#weather-description');
const myTemperature = document.querySelector('#temperature');
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const figCaption = document.querySelector('#icon-description');

// API OpenWeather
const myKey = "66c6ef90f50ed28ef42520446f90f69e";
const myLat = "-3.7480872947615325";
const myLong = "-73.25991707321536";
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

// Obtener datos del clima
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

// Mostrar datos del clima
function displayResults(data) {
  const iconCode = data.weather[0].icon;
  const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  myTown.textContent = data.name;
  myDescription.textContent = data.weather[0].description;
  myTemperature.textContent = `${data.main.temp.toFixed(1)} °C`;
  currentTemp.textContent = `${data.main.temp.toFixed(1)} °C`;
  weatherIcon.setAttribute('src', iconURL);
  weatherIcon.setAttribute('alt', data.weather[0].description);
  figCaption.textContent = data.weather[0].description;
}

// Iniciar clima
apiFetch();

// API del pronóstico
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

// Forecast
function displayForecast(data) {
  const container = document.querySelector("#forecast-container");
  container.innerHTML = "";

  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyForecasts.slice(0, 3).forEach(forecast => {
    const date = new Date(forecast.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const temp = Math.round(forecast.main.temp);

    const forecastText = document.createElement("p");
    forecastText.innerHTML = `${dayName}:  <strong> ${temp} °C </strong>`;
    container.appendChild(forecastText);
  });
}

// Iniciar pronóstico
getForecast();
