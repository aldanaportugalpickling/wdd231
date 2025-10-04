async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json"); // ajusta la ruta si tu JSON está en otra carpeta
    const members = await response.json();

    // Filtrar solo Gold (3) y Silver (2)
    const filtered = members.filter(m => m.membership === "2" || m.membership === "3");

    // Seleccionar 3 aleatorios
    const selected = [];
    while (selected.length < 3 && filtered.length > 0) {
      const index = Math.floor(Math.random() * filtered.length);
      selected.push(filtered.splice(index, 1)[0]);
    }

    // Mostrar las cartas en el HTML
    const container = document.querySelector("#spotlight-container");
    container.innerHTML = "";

    selected.forEach(m => {
      const c = document.createElement("section");
      c.classList.add("card");

      const img = document.createElement("img");
      img.src = m.image;
      img.alt = `Logo of ${m.name}`;
      img.loading = "lazy";
      img.setAttribute("width", "200");
      img.setAttribute("height", "200");

      const name = document.createElement("h3");
      name.textContent = m.name;

      const address = document.createElement("p");
      address.textContent = m.address;

      const phone = document.createElement("p");
      phone.textContent = m.phone;

      const link = document.createElement("a");
      link.href = m.website;
      link.target = "_blank";
      link.textContent = "Visit Website";

      const level = document.createElement("p");
      level.textContent = `Membership: ${m.membership === "3" ? "Gold" : "Silver"}`;

      [img, name, address, phone, link, level].forEach(el => c.appendChild(el));
      container.appendChild(c);
    });
  } catch (error) {
    console.error("Error loading spotlight members:", error);
  }
}

loadSpotlights();


