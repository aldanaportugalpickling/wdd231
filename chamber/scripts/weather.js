document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');
      

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

//SELECT HTML  ELEMENTS IN  THE DOCUMENT
const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperaturw = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

//CREATE REQUIED VARIABLES FOR THE URL
const myKey = "66c6ef90f50ed28ef42520446f90f69e"
const myLat = "-3.7480872947615325" 
const myLong = "-73.25991707321536"

//CONSTRUCT A FULL PATH USING TEMPLATE LITERALS
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`

//GRAB THE CURRENT WEATHER DATA
async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      // displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}



//DISPLAY THE JSON DATA INTO MY WEB PAGE
function displayResults(data) {
  myTown.textContent = data.name;
  myDescription.textContent = data.weather[0].description;
  myTemperature.textContent = `${data.main.temp} °C`;
  document.querySelector('#current-temp').textContent = `${data.main.temp} °C`;
  document.querySelector('#weather-icon').setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  document.querySelector('figcaption').textContent = data.weather[0].description;
}
//START THE PROCESS 
apiFetch();

