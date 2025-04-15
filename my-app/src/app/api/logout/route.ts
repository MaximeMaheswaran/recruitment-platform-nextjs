// Importation des utilitaires pour manipuler les cookies côté serveur
import { cookies } from 'next/headers';
// Importation de NextResponse pour construire une réponse HTTP
import { NextResponse } from 'next/server';

// Fonction appelée lors d'une requête POST (ex: lors d'une déconnexion)
export async function POST() {
  // Récupère l'objet cookieStore pour accéder aux cookies de la requête
  const cookieStore = cookies();

  // Supprime le cookie 'recruteur_token' en le remplaçant par une valeur vide
  // et en définissant maxAge à -1 (ce qui force sa suppression immédiate)
  (await cookieStore).set('recruteur_token', '', {
    maxAge: -1,    // Supprime le cookie immédiatement
    path: '/',     // S'applique à tout le site
  });

  // Retourne une réponse JSON confirmant la déconnexion
  return NextResponse.json({ message: 'Déconnecté' });
}
