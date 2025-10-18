
// ====== Form handling ======
const form = document.getElementById('subscribe-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!firstName || !lastName || !email) {
        alert("⚠️ Please fill out all fields before subscribing.");
        return;
    }

    // Guarda en localStorage
    const newSub = {
        firstName,
        lastName,
        email,
        date: new Date().toLocaleString()
    };
    const storedSubs = JSON.parse(localStorage.getItem('subscriptions')) || [];
    storedSubs.push(newSub);
    localStorage.setItem('subscriptions', JSON.stringify(storedSubs));

    // Ventana emergente
    window.alert(`🎉 Congratulations, ${firstName}! You've successfully subscribed. In the coming days, we will send you updates.`);

    // Redirigir a form-response.html con datos en la URL
    window.location.href = `form-response.html?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}`;
});
