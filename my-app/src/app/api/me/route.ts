// Importation des utilitaires nécessaires pour manipuler les cookies côté serveur
import { cookies } from 'next/headers';
// Importation de NextResponse pour générer des réponses HTTP
import { NextResponse } from 'next/server';

// Fonction appelée lors d'une requête GET (ex: pour récupérer les infos de l'utilisateur connecté)
export async function GET() {
  // Récupère le cookie 'session' depuis l'en-tête de la requête
  const cookie = (await cookies()).get('session');

  // Si le cookie 'session' n'est pas présent, cela signifie que l'utilisateur n'est pas connecté
  if (!cookie) {
    // Retourne une réponse JSON avec une erreur 401 (Non autorisé)
    return NextResponse.json({ error: 'Non connecté' }, { status: 401 });
  }

  // Si le cookie existe, on le parse pour obtenir les données de l'utilisateur (stockées en JSON)
  const user = JSON.parse(cookie.value);

  // Retourne les informations de l'utilisateur sous forme de réponse JSON
  return NextResponse.json({ user });
}
