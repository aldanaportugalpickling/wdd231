document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Hamburger button
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});



document.addEventListener("DOMContentLoaded", () => {
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    visitMessage.textContent =
      days < 1
        ? "Back so soon! Awesome!"
        : `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
  }
  localStorage.setItem("lastVisit", now);

  // JSON data loading
  fetch("data/discover.json")
    .then((res) => res.json())
    .then((places) => {
      const container = document.getElementById("card-container");
      places.forEach((place, index) => {
        const card = document.createElement("section");
        card.classList.add("card");
       

        card.innerHTML = `
          <h2>${place.name}</h2>
          <figure>
            <img class="opac" src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
          </figure>
          <address>${place.address}</address>
          <p>${place.description}</p>
          <button>More Info</button>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Error loading JSON:", err));
});
