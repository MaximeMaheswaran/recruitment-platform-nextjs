import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_super_secret';

// Fonction pour générer un token
export function generateToken(payload: { id: number; firstname: string; lastname: string }): string {
  return jwt.sign(
    {
      id: payload.id,            // ID de l'utilisateur
      firstname: payload.firstname,  // Prénom de l'utilisateur
      lastname: payload.lastname,    // Nom de l'utilisateur
    },
    JWT_SECRET,
    {
      expiresIn: '7d',  // Durée de validité du token
    }
  );
}

// Fonction pour vérifier un token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
