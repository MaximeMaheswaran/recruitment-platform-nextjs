import { useState, useEffect } from 'react';

// Hook personnalisé pour vérifier si le composant est monté côté client
function useIsMounted() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted;
}

export default useIsMounted;
