// Indique que ce composant doit être exécuté côté client (nécessaire pour hooks comme useEffect)
'use client';

import ListCandidate from "@/components/ListCandidate"; // Composant affichant la liste des candidats
import { useEffect, useState } from "react";            // Importation des hooks React
import { useRouter } from "next/navigation";            // Hook pour gérer la navigation côté client

export default function Page() {
  const router = useRouter();                           // Initialisation du routeur pour les redirections
  const [isAuthChecked, setIsAuthChecked] = useState(false); // État pour vérifier si l'utilisateur est authentifié

  useEffect(() => {
    // Recherche du cookie 'recruteur_token' dans le document
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));

    // Si aucun cookie n'est trouvé, redirection vers la page de signup
    if (!cookie) {
      router.push('/signup');
    } else {
      // Si cookie trouvé, on autorise le rendu
      setIsAuthChecked(true);
    }
  }, [router]);

  // Si l'authentification n'est pas encore vérifiée, ne rien afficher (évite un affichage inutile)
  if (!isAuthChecked) return null;

  // Une fois l'utilisateur validé, affichage de la liste des candidats
  return <ListCandidate />;
}
