// Indique que ce composant s’exécute côté client
'use client';

import { useEffect, useState } from 'react';         // Hooks React pour les effets et l’état
import { useRouter } from 'next/navigation';         // Hook Next.js pour la navigation côté client
import FormConnection from '@/components/FormConnection'; // Formulaire de connexion ou d'inscription

export default function SignupPage() {
  const router = useRouter();                        // Initialisation du router
  const [loading, setLoading] = useState(true);      // État de chargement pour éviter le rendu trop tôt

  useEffect(() => {
    // Recherche du cookie 'recruteur_token' dans les cookies du navigateur
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));

    // Si un token existe déjà, redirige vers la page RH (l'utilisateur est déjà connecté)
    if (cookie) {
      router.push('/rh');
      return;
    }

    // Sinon, fin du chargement, on peut afficher le formulaire
    setLoading(false);
  }, [router]);

  // Tant que la vérification est en cours, on n’affiche rien
  if (loading) return null;

  // Une fois le chargement terminé et pas de token, on affiche le formulaire de connexion
  return <FormConnection />;
}
