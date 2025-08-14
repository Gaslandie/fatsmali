// Fichier : loadComponents.js
function includeHTML(callback) {
    let z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    let elementsToInclude = []; // Tableau pour stocker les éléments à inclure

    // 1. On trouve tous les éléments à inclure en premier
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            elementsToInclude.push({ elmnt: elmnt, file: file });
        }
    }

    let elementsIncluded = 0;

    // 2. Si aucun élément à inclure, on exécute le callback
    if (elementsToInclude.length === 0) {
        if (callback) {
            callback();
        }
        return;
    }

    // 3. On traite chaque élément un par un
    elementsToInclude.forEach(item => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    item.elmnt.innerHTML = this.responseText;
                }
                if (this.status == 404) {
                    item.elmnt.innerHTML = "Page not found.";
                }
                item.elmnt.removeAttribute("w3-include-html");

                // On incrémente le compteur et on vérifie si tous les fichiers sont chargés
                elementsIncluded++;
                if (elementsIncluded === elementsToInclude.length) {
                    // C'est ici que l'on appelle le callback une fois que tout est chargé
                    if (callback) {
                        callback();
                    }
                }
            }
        };
        xhttp.open("GET", item.file, true);
        xhttp.send();
    });
};