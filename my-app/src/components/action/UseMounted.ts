// Importation des hooks useState et useEffect de React
import { useState, useEffect } from 'react';

// Hook personnalisé pour vérifier si le composant est monté côté client
function useIsMounted() {
    // Déclaration de l'état 'isMounted' qui sera utilisé pour savoir si le composant est monté
    const [isMounted, setIsMounted] = useState(false);

    // Utilisation du hook useEffect qui s'exécute après le premier rendu du composant
    useEffect(() => {
        // Dès que le composant est monté, on met 'isMounted' à true
        setIsMounted(true);
    }, []); // Le tableau vide [] signifie que cet effet se déclenche uniquement au montage du composant

    // Retourne la valeur de 'isMounted' pour pouvoir l'utiliser dans le composant appelant
    return isMounted;
}

// Exportation du hook pour pouvoir l'utiliser dans d'autres composants
export default useIsMounted;
