// Indique à Next.js que ce composant s'exécute côté client (pour pouvoir utiliser les hooks React)
'use client';

import NewCandidate from "@/components/NewCandidate"; // Composant pour créer un nouveau candidat
import { useEffect, useState } from "react";          // Hooks React
import { useRouter } from "next/navigation";          // Hook Next.js pour naviguer côté client

export default function Page() {
  const router = useRouter();                         // Initialisation du router
  const [isAuthChecked, setIsAuthChecked] = useState(false); // État pour vérifier l'authentification

  useEffect(() => {
    // Recherche du cookie d'authentification dans le navigateur
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));

    // Si le cookie est absent → redirection vers la page d’inscription
    if (!cookie) {
      router.push('/signup');
    } else {
      // Sinon, on autorise le rendu du composant
      setIsAuthChecked(true);
    }
  }, [router]);

  // Tant que la vérification n'est pas terminée, ne rien afficher
  if (!isAuthChecked) return null;

  // Une fois vérifié, afficher le composant pour créer un candidat
  return <NewCandidate />;
}
