const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');


navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show'); 
    
});

const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");
const display = document.getElementById("members");

gridButton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listButton.addEventListener("click", () => {
  display.classList.add("list");
  display.classList.remove("grid");
});


//Get the current year and the Last modified
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`; 

async function getMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
}
getMembers();


function displayMembers(members) {
  const cards = document.querySelector('#cards');
  cards.innerHTML = ''; // limpiar antes de insertar

  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('card');

    // Imagen de la empresa
    const img = document.createElement('img');
    img.src = member.image;
    img.alt = `Logo of ${member.name}`;
    img.loading = 'lazy';

    // Nombre
    const name = document.createElement('h3');
    name.textContent = member.name;

    // Dirección
    const address = document.createElement('p');
    address.textContent = member.address;

    // Teléfono
    const phone = document.createElement('p');
    phone.textContent = member.phone;

    // Enlace a sitio web
    const link = document.createElement('a');
    link.href = member.website;
    link.target = '_blank';
    link.textContent = 'Visit Website';

    // Nivel de membresía
    const membership = document.createElement('p');
    membership.textContent = `Membership: ${member.membership}`;

      
    // Agregar todo al card
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(link);
    card.appendChild(membership);

    cards.appendChild(card);
  });
}
