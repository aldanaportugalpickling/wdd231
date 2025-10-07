// Mostrar año actual
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Obtener los parámetros de la URL (enviados desde join.html)
const params = new URLSearchParams(window.location.search);

// Obtener los valores del formulario
const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const organization = params.get("organization");
const membership = params.getAll("membership"); // pueden haber varios checkbox
const timestamp = params.get("timestamp");

// Mostrar los datos en la página
if (firstName && lastName) {
  document.getElementById("user-info").innerHTML = `
    <strong>${firstName} ${lastName}</strong>, thank you for submitting your membership application.<br>
    We've received your contact at <strong>${email}</strong> for the organization <strong>${organization}</strong>.
  `;
}

if (membership.length > 0) {
  document.getElementById("membership-info").innerHTML = `
    <strong>Membership level(s) selected:</strong> ${membership.join(", ")}
  `;
}

if (timestamp) {
  document.getElementById("timestamp-info").innerHTML = `
    <em>Form submitted on:</em> ${timestamp}
  `;
}
