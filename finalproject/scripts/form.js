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

    const storedSubs = JSON.parse(localStorage.getItem('subscriptions')) || [];
    storedSubs.push(newSub);
    localStorage.setItem('subscriptions', JSON.stringify(storedSubs));

    confirmation.textContent = `✅ Thank you, ${firstName}! You've been successfully subscribed.`;
    confirmation.style.color = "green";

    form.reset();
});