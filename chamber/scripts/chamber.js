const navBtn = document.querySelector('#nav-button'),
      navBar = document.querySelector('#nav-bar'),
      gridBtn = document.getElementById("grid"),
      listBtn = document.getElementById("list"),
      cards = document.getElementById("cards");

navBtn.addEventListener('click', () => {
  navBtn.classList.toggle('show');
  navBar.classList.toggle('show');
});

gridBtn.addEventListener("click", () => {
  cards.classList.add("grid");
  cards.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  cards.classList.add("list");
  cards.classList.remove("grid");
});

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

async function getMembers() {
  const res = await fetch('data/members.json');
  const data = await res.json();
  renderMembers(data);
}
getMembers();

function renderMembers(data) {
  cards.innerHTML = '';
  data.forEach(m => {
    const c = document.createElement('section');
    c.classList.add('card');

    const img = document.createElement('img');
    img.src = m.image;
    img.alt = `Logo of ${m.name}`;
    img.loading = 'lazy';
    img.setAttribute('width', '200');
    img.setAttribute('height', '200');

    //pruebaaa
    const name = document.createElement(m.name === "Amazon Eco Tours" ? 'h2' : 'h3');

    const name = document.createElement('h3');
    name.textContent = m.name;

    const address = document.createElement('p');
    address.textContent = m.address;

    const phone = document.createElement('p');
    phone.textContent = m.phone;

    const link = document.createElement('a');
    link.href = m.website;
    link.target = '_blank';
    link.textContent = 'Visit Website';

    const level = document.createElement('p');
    level.textContent = `Membership: ${m.membership}`;

    [img, name, address, phone, link, level].forEach(el => c.appendChild(el));
    cards.appendChild(c);
  });
}
