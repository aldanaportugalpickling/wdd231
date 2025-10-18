//get the current year and last modified 
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburger button 
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');

});
