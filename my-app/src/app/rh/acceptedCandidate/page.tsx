// Directive Next.js pour indiquer que ce composant est exécuté côté client
'use client';

import AcceptedCandidate from "@/components/Acceptedcanddidate"; // Composant affichant les candidats acceptés
import { useEffect, useState } from "react";                    // Hooks React
import { useRouter } from "next/navigation";                    // Hook Next.js pour la navigation côté client

export default function Page() {
  const router = useRouter();                          // Permet de naviguer entre les pages
  const [isAuthChecked, setIsAuthChecked] = useState(false); // État pour s'assurer que la vérification est faite

  useEffect(() => {
    // Vérifie la présence du cookie 'recruteur_token' dans le navigateur
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));

    // Si le cookie n'est pas présent, l'utilisateur est redirigé vers la page d'inscription
    if (!cookie) {
      router.push('/signup');
    } else {
      // Si le cookie est présent, on peut afficher le contenu de la page
      setIsAuthChecked(true);
    }
  }, [router]);

  // Tant que la vérification n’est pas faite, on ne rend rien (évite le flicker d’affichage)
  if (!isAuthChecked) return null;

  // Une fois l'utilisateur vérifié, on affiche le composant des candidats acceptés
  return <AcceptedCandidate />;
}
