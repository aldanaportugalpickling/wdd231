// ==== Current year & last modified ====
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// ==== Hamburger button ====
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

// ==== Local storage: last visit message ====
document.addEventListener("DOMContentLoaded", () => {
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = Number(localStorage.getItem("lastVisit"));
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

  // ==== Load places from JSON ====
  fetch("data/discover.json")
    .then(res => res.json())
    .then(places => {
      const container = document.getElementById("card-container");

      places.forEach(place => {
        // Card container
        const card = document.createElement("section");
        card.classList.add("card");

        // Name
        const h2 = document.createElement("h2");
        h2.textContent = place.name;

        // Figure & lazy-loaded image
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = place.image;
        img.alt = place.name;
        img.width = 330;
        img.height = 220;
        img.loading = "lazy"; // lazy load activado
        figure.appendChild(img);

        // Address
        const address = document.createElement("address");
        address.textContent = place.address;

        // Description
        const desc = document.createElement("p");
        desc.textContent = place.description;

        // More Info button
        const button = document.createElement("button");
        button.textContent = "More Info";
        button.classList.add("more-info");

        card.append(h2, figure, address, desc, button);
        container.appendChild(card);

        // Dialog for extra info
        const dialog = document.createElement("dialog");
        dialog.innerHTML = `
          ${getAdditionalInfo(place.name)}
          <button class="close-dialog">Close</button>
        `;
        document.body.appendChild(dialog);

        button.addEventListener("click", () => dialog.showModal());
        dialog.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
      });
    })
    .catch(err => console.error("Error loading JSON:", err));
});

// ==== Additional info function ====
function getAdditionalInfo(name) {
  switch(name) {
    case "Iquitos Main Square":
      return `<p><strong>Fun Fact:</strong> Historic center with colonial architecture.</p>
              <p><strong>Tip:</strong> Visit in the evening for street performers and local food stalls.</p>`;
    case "Tarapaca Boardwalk":
      return `<p><strong>Fun Fact:</strong> Popular riverside promenade with sculptures along the walkway.</p>
              <p><strong>Tip:</strong> Great spot for sunrise photography along the river.</p>
              <p><strong>History:</strong> Gathering place since the early 20th century.</p>`;
    case "Iron House":
      return `<p><strong>Fun Fact:</strong> Iron sheets were shipped from France in the 19th century.</p>
              <p><strong>History:</strong> Designed by Belgian engineer Joseph Danly, relic of the rubber boom era.</p>`;
    case "Belen Market":
      return `<p><strong>Fun Fact:</strong> Some stalls float during rainy season.</p>
              <p><strong>Tip:</strong> Try local fruits and observe floating houses.</p>`;
    case "Pacaya Samiria National Reserve":
      return `<p><strong>Info:</strong> Guided tours recommended to safely explore the rainforest.</p>
              <p><strong>Fun Fact:</strong> Houses unique Amazonian biodiversity.</p>`;
    case "Amazonian Museum":
      return `<p><strong>Fun Fact:</strong> Exhibits on indigenous cultures and Amazonian art.</p>
              <p><strong>Tip:</strong> Temporary exhibitions from local artists.</p>`;
    case "Nanay Bridge":
      return `<p><strong>Fun Fact:</strong> Bridge lights up at night, perfect for photos.</p>
              <p><strong>History:</strong> Connects Iquitos with surrounding districts.</p>`;
    case "Amazon Rescue Center (CREA)":
      return `<p><strong>Info:</strong> See rescued manatees and learn about wildlife conservation.</p>
              <p><strong>Fun Fact:</strong> Also cares for caimans and tropical birds.</p>`;
    default:
      return `<p>Learn more about this place when you visit!</p>`;
  }
}
