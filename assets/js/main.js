// Fichier : assets/js/main.js

/**
 * Cette fonction contient toute la logique pour animer les compteurs
 * sur la page. Elle peut être appelée depuis d'autres scripts.
 */
function initializeCounters() {
    // Sélectionne tous les éléments avec la classe 'counter'
    const counters = document.querySelectorAll('.counter');

    // Options pour l'observateur d'intersection (déclenche l'animation
    // lorsque 50% de l'élément est visible)
    const options = { root: null, threshold: 0.5 };

    // Crée un observateur d'intersection
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Si l'élément est visible
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const increment = target / 200; // Vitesse d'incrémentation

                // Fonction récursive pour l'animation progressive
                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCounter); // Animation fluide
                    } else {
                        // Affiche la valeur finale avec suffixe éventuel
                        counter.innerText = target;
                        if (target === 5 || target === 150) {
                            counter.innerText += '+';
                        } else if (target === 100) {
                            counter.innerText += '%';
                        }
                        observer.unobserve(counter); // Arrête d'observer cet élément
                    }
                };
                // Lance l'animation
                updateCounter();
            }
        });
    }, options);

    // Lance l'observation de tous les compteurs
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    // On écoute l'événement 'submit' du formulaire
    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Validation du nom
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameInput.classList.remove('is-invalid');
        }

        // Validation de l'email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
        }

        // Validation du téléphone (vérifie s'il y a des chiffres)
        const phoneInput = document.getElementById('phone');
        if (phoneInput.value.trim() === '' || isNaN(phoneInput.value.trim().replace(/\s/g, ''))) {
            phoneInput.classList.add('is-invalid');
            isValid = false;
        } else {
            phoneInput.classList.remove('is-invalid');
        }

        // Validation du message
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            messageInput.classList.add('is-invalid');
            isValid = false;
        } else {
            messageInput.classList.remove('is-invalid');
        }

        // Si la validation échoue, on empêche l'envoi du formulaire
        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
        }
    });
});