
// Updates the responsive menu for the top nav classes on Click of the Hamburger Menu Icon
const handleResponsiveMenu = () => {
    const nav = document.getElementById("myTopnav");
    if (nav.className === "topnav") {
        nav.className += " responsive";
    } else {
        nav.className = "topnav";
    }
}

const addListeners = () => {

    // Responsive Hamburger Menu
    const hamburgerMenu = document.querySelector('.hamburger-icon');
    hamburgerMenu.addEventListener('click', handleResponsiveMenu);
}

const init = () =>  {
    addListeners();
}

const APP = (function () {
    document.addEventListener('DOMContentLoaded', init);
})();
