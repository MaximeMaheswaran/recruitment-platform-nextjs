// Indique à Next.js que ce composant doit être exécuté côté client
'use client';

import InfoCandidate from "@/components/InfoCandidate";   // Composant qui affiche les infos d’un candidat
import { useEffect, useState } from "react";              // Hooks React pour les effets et l’état local
import { useRouter } from "next/navigation";              // Hook de navigation côté client dans Next.js

export default function Page() {
  const router = useRouter();                             // Initialisation du router pour rediriger si besoin
  const [isAuthChecked, setIsAuthChecked] = useState(false); // État pour s'assurer que l'auth a été vérifiée

  useEffect(() => {
    // Récupère le cookie nommé 'recruteur_token'
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));

    // Si le cookie est absent, rediriger vers la page d’inscription
    if (!cookie) {
      router.push('/signup');
    } else {
      // Si le cookie est présent, on considère que l’utilisateur est authentifié
      setIsAuthChecked(true);
    }
  }, [router]);

  // Empêche le rendu du composant tant que l’authentification n’est pas validée
  if (!isAuthChecked) return null;

  // Si l'utilisateur est authentifié, afficher les informations du candidat
  return <InfoCandidate />;
}
