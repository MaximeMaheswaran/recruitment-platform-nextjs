// Importation du module jsonwebtoken pour la gestion des tokens JWT
import jwt from 'jsonwebtoken';

// Définition de la clé secrète utilisée pour signer et vérifier les tokens
// Elle est récupérée depuis les variables d'environnement ou prend une valeur par défaut
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_super_secret';

// Fonction pour générer un token JWT
// Elle prend un objet contenant l'id, le prénom et le nom de l'utilisateur comme argument
export function generateToken(payload: { id: number; firstname: string; lastname: string }): string {
  return jwt.sign(
    {
      id: payload.id,                // ID de l'utilisateur
      firstname: payload.firstname,  // Prénom de l'utilisateur
      lastname: payload.lastname,    // Nom de l'utilisateur
    },
    JWT_SECRET,                      // Clé secrète utilisée pour signer le token
    {
      expiresIn: '7d',               // Durée de validité du token (ici 7 jours)
    }
  );
}

// Fonction pour vérifier un token JWT
// Elle prend le token en entrée et tente de le décoder
export function verifyToken(token: string) {
  try {
    // Vérifie et décode le token en utilisant la clé secrète
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // En cas d'erreur (ex: token invalide ou expiré), retourne null
    return null;
  }
}
