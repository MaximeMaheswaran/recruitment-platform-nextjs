// Indique à Next.js que ce composant est côté client (obligatoire pour utiliser les hooks React)
'use client';

import PendingCandidate from "@/components/PendingCandidate"; // Composant qui affiche les candidats en attente
import { useEffect, useState } from "react";                  // Import des hooks React
import { useRouter } from "next/navigation";                  // Hook de navigation côté client (Next.js)

export default function Page() {
  const router = useRouter();                                 // Initialisation du router
  const [isAuthChecked, setIsAuthChecked] = useState(false);  // État pour savoir si l'utilisateur est authentifié

  useEffect(() => {
    // Recherche du cookie 'recruteur_token' dans les cookies du navigateur
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));

    // Si le cookie est absent → redirection vers la page d'inscription
    if (!cookie) {
      router.push('/signup');
    } else {
      // Si le cookie est présent → l'utilisateur est authentifié
      setIsAuthChecked(true);
    }
  }, [router]);

  // Empêche le rendu tant que la vérification n'est pas terminée
  if (!isAuthChecked) return null;

  // Une fois authentifié, affiche le composant des candidats en attente
  return <PendingCandidate />;
}
