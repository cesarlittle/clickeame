window.addEventListener("scroll", function() {
    var header = document.getElementById("fondodeheader");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const menuHamburguesa = document.querySelector(".menu-hamburguesa");
    const menuItems = document.querySelector(".menu-items");

    menuHamburguesa.addEventListener("click", function() {
        menuItems.classList.toggle("show");
    });

    // Cerrar el menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll(".menu-items a");
    menuLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            menuItems.classList.remove("show");
        });
    });
});
