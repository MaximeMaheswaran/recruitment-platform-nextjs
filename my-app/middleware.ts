import { NextRequest, NextResponse } from 'next/server'; // Importation des types NextRequest et NextResponse de Next.js
import { verifyToken } from './lib/auth'; // Importation de la fonction verifyToken pour vérifier la validité du token

// Middleware pour la gestion de l'authentification des utilisateurs
export function middleware(request: NextRequest) {
  // Récupération du token depuis les cookies de la requête
  const token = request.cookies.get('recruteur_token')?.value;

  // Si le token est inexistant ou invalide, rediriger l'utilisateur vers la page d'inscription
  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL('/signup', request.url)); // Redirige l'utilisateur vers la page d'inscription (/signup)
  }

  // Si le token est valide, on laisse la requête passer à la prochaine étape (next)
  return NextResponse.next();
}

// Configuration du middleware : il s'applique uniquement aux routes listées dans "matcher"
export const config = {
  matcher: [
    '/rh/:path*',              // Protège toutes les routes sous "/rh"
    '/rh/acceptedCandidate',    // Protège cette route spécifique
    '/rh/infoCandidate',        // Protège cette route spécifique
    '/rh/listCandidate',        // Protège cette route spécifique
    '/rh/newCandidate',         // Protège cette route spécifique
    '/rh/pendingCandidate',     // Protège cette route spécifique
    '/rh/rejectedCandidate',    // Protège cette route spécifique
  ],
};
