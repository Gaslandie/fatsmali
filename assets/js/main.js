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

/**
 * Cette fonction gère la validation et l'envoi du formulaire de contact via AJAX.
 */
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) { return; }

    form.addEventListener('submit', async function (event) {
        // Validation côté client
        let isValid = true;
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') { nameInput.classList.add('is-invalid'); isValid = false; } else { nameInput.classList.remove('is-invalid'); }

        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) { emailInput.classList.add('is-invalid'); isValid = false; } else { emailInput.classList.remove('is-invalid'); }

        const phoneInput = document.getElementById('phone');
        if (phoneInput.value.trim() === '' || isNaN(phoneInput.value.trim().replace(/\s/g, ''))) { phoneInput.classList.add('is-invalid'); isValid = false; } else { phoneInput.classList.remove('is-invalid'); }

        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') { messageInput.classList.add('is-invalid'); isValid = false; } else { messageInput.classList.remove('is-invalid'); }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
            return; // Arrête l'exécution si la validation échoue
        }

        // Empêche la soumission traditionnelle du formulaire
        event.preventDefault();

        // Envoi via AJAX
        const submitBtn = document.getElementById('submitBtn');
        const formData = new FormData(form);
        const formUrl = form.action;

        submitBtn.disabled = true;
        submitBtn.innerText = 'Envoi...';

        try {
            const response = await fetch(formUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Succès
                submitBtn.innerText = 'Message envoyé !';
                submitBtn.classList.remove('btn-custom');
                submitBtn.classList.add('btn-success');
                form.reset();
                setTimeout(() => {
                    submitBtn.innerText = 'Envoyer';
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-custom');
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                // Erreur
                submitBtn.innerText = 'Erreur lors de l\'envoi !';
                submitBtn.classList.remove('btn-custom');
                submitBtn.classList.add('btn-danger');
            }
        } catch (error) {
            console.error(error);
            submitBtn.innerText = 'Erreur réseau !';
            submitBtn.classList.remove('btn-custom');
            submitBtn.classList.add('btn-danger');
        }
    });
}