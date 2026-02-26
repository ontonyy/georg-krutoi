
// Email message sending logic
window.onload = function() {
    (function() {
        emailjs.init({
            publicKey: "QNNblKigrkDuwHM1X",
        });
    })();

    let templateId = 'template_31mkcms';
    let serviceId = 'service_eyvhhlo';
    let contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(event) {
        console.log('SUCCESS!');
        event.preventDefault();
        emailjs.sendForm(serviceId, templateId, this)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you, mail is sent successfully!');
                contactForm.reset();
            }, (error) => {
                console.log('FAILED...', error);
                alert('Failed to send the mail, please try again.');
            });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Handling cards clicking with taking page number proper image and title
    let pageButtons = document.querySelectorAll('a[data-bs-toggle="modal"]');

    pageButtons.forEach(function(a) {
        a.addEventListener('click', function(event) {
            let pageNumber = a.getAttribute('data-page');
            let modalTitle = document.getElementById('modal-card-label');
            let modalImage = document.querySelector('#modal-card .modal-body img');

            let imgNumber = parseInt(pageNumber, 10) + 1;

            modalTitle.textContent = `Page №${pageNumber}`;
            modalImage.src = `images/${imgNumber}.png`;
        });
    });

    // Dark/Light theme handling
    const textElement = document.getElementById("theme-change");
    let isBlack = true;

    textElement.addEventListener("click", function() {
        const navbar = document.querySelector('.navbar');
        const footer = document.querySelector('.footer');
        const themeIcon = document.getElementById('theme-icon');
        const emailLink = footer.querySelector('a[href^="mailto"]');
        const socialIcons = footer.querySelectorAll('.social-icons a');

        if (isBlack) {
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";

            navbar.style.color = "black";
            navbar.classList.remove(...['navbar-dark', 'bg-black']);
            navbar.classList.add(...['navbar-light', 'bg-white']);

            footer.classList.remove('bg-black');
            footer.classList.add('bg-white');
            emailLink.classList.remove('text-white');
            emailLink.classList.add('text-dark');
            socialIcons.forEach(icon => {
                icon.classList.remove('text-white');
                icon.classList.add('text-dark');
            });

            themeIcon.classList.remove('bi-moon-stars-fill');
            themeIcon.classList.add('bi-brightness-high-fill');
            isBlack = false;
        } else {
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";

            navbar.style.color = "white";
            navbar.classList.remove(...['navbar-light', 'bg-white']);
            navbar.classList.add(...['navbar-dark', 'bg-black']);

            footer.classList.add('bg-black');
            footer.classList.remove('bg-white');
            emailLink.classList.add('text-white');
            emailLink.classList.remove('text-dark');
            socialIcons.forEach(icon => {
                icon.classList.add('text-white');
                icon.classList.remove('text-dark');
            });

            themeIcon.classList.remove('bi-brightness-high-fill');
            themeIcon.classList.add('bi-moon-stars-fill');
            isBlack = true;
        }
    });
});