import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";  // Assurez-vous que bcrypt est installé

const prisma = new PrismaClient();

// Fonction de connexion
export async function login(username: string, password: string) {
  try {
    // Vérifier si le recruteur existe dans la base de données
    const recruteur = await prisma.recruteur.findUnique({
      where: { username },
    });

    if (!recruteur) {
      throw new Error("Utilisateur non trouvé");
    }

    // Comparer le mot de passe entré avec le mot de passe stocké (hâché) dans la base de données
    const isPasswordValid = await bcrypt.compare(password, recruteur.password);

    if (!isPasswordValid) {
      throw new Error("Mot de passe incorrect");
    }

    // Si le mot de passe est valide, on retourne le recruteur
    return {
      message: "Connexion réussie",
      recruteur,  // Retourner l'objet recruteur (à adapter selon les informations que tu souhaites renvoyer)
    };
  } catch (error: unknown) {
    // Vérifier si l'erreur est une instance d'Error
    if (error instanceof Error) {
      return {
        error: error.message,  // Utiliser message qui est défini sur l'objet Error
      };
    } else {
      // Si l'erreur n'est pas une instance d'Error, renvoyer un message générique
      return {
        error: "Une erreur inconnue s'est produite",
      };
    }
  }
}
