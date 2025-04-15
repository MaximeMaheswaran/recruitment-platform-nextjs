// Indique que ce composant s'exécute côté client (obligatoire pour utiliser les hooks React)
'use client'

import RejectedCandidate from "@/components/RejectedCandidate"; // Composant qui affiche les candidats refusés
import { useEffect, useState } from "react";                   // Hooks React pour les effets et l'état local
import { useRouter } from "next/navigation";                   // Hook de navigation de Next.js

export default function Page() {
  const router = useRouter();                                 // Initialisation du router pour les redirections
  const [isAuthChecked, setIsAuthChecked] = useState(false);  // État pour vérifier l'authentification

  useEffect(() => {
    // Vérifie la présence du cookie 'recruteur_token' dans les cookies du navigateur
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));

    // Si le cookie n'existe pas, redirige l'utilisateur vers la page de signup
    if (!cookie) {
      router.push('/signup');
    } else {
      // Sinon, on peut afficher le contenu de la page
      setIsAuthChecked(true);
    }
  }, [router]);

  // Tant que la vérification n’est pas faite, on n'affiche rien
  if (!isAuthChecked) return null;

  // Une fois l'utilisateur authentifié, on affiche la liste des candidats refusés
  return <RejectedCandidate />;
}
