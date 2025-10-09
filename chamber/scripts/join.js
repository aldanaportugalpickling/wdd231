document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Botón hamburguesa
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});


//Guardar fecha y hora exacta cada que envias o abras un formulario.
document.querySelector("#timestamp").value = new Date().toLocaleString();

const openButtons = document.querySelectorAll(".learn-btn");
const closeButtons = document.querySelectorAll(".close-btn");

openButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    document.getElementById(modalId).showModal();
  });
});

closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});
