// get current year and last modified
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// hamburger button
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

// form submission
const form = document.getElementById('subscribe-form');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!firstName || !lastName || !email) {
        confirmation.textContent = "⚠️ Please fill out all fields.";
        confirmation.style.color = "crimson";
        return;
    }

    const newSub = {
        firstName,
        lastName,
        email,
        date: new Date().toLocaleString()
    };

    // store en localStorage
    const storedSubs = JSON.parse(localStorage.getItem('subscriptions')) || [];
    storedSubs.push(newSub);
    localStorage.setItem('subscriptions', JSON.stringify(storedSubs));

    // Mostrar mensaje de confirmación en la página
    confirmation.textContent = `✅ Thank you, ${firstName}! You've been successfully subscribed.`;
    confirmation.style.color = "green";

    // Limpiar el formulario
    form.reset();

    // Abrir ventana emergente tipo alerta
    window.alert(`🎉 Congratulations, ${firstName}! You've successfully subscribed. In the coming days, we will send you notifications and updates.`);
});
