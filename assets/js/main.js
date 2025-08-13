//attend que le dom soit chargé
document.addEventListener('DOMContentLoaded', () => {

    //animation des compteurs
    const counters = document.querySelectorAll('.counter');

    //declencher l'animation quand 50% de l'element est visible
    const options = { root: null, threshold: 0.5 };


    //observer l'apparition des compteurs à l'ecran
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // quand l'element devient visible
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const increment = target / 200; //vitesse d'incrementation

                //Fonction recursive qui augmente le compteur progressivement
                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCounter); //animation fluide
                    } else {
                        //affiche la valeur finale avec suffixe eventuel
                        counter.innerText = target;
                        if (target === 5) {
                            counter.innerText += '+';
                        }
                        else if (target === 150) {
                            counter.innerText += '+';
                        } else if (target === 100) {
                            counter.innerText += '%';
                        }
                        observer.unobserve(counter); //arrete d'observer cet element
                    }
                }
                updateCounter();
            }
        });
    }, options);
    //lance l'observation de tous les compteurs
    counters.forEach(counter => {
        observer.observe(counter);
    })

})


