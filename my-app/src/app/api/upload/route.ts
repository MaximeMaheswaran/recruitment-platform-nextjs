// Importation des modules nécessaires
import { NextRequest } from 'next/server';  // Permet de travailler avec la requête HTTP dans Next.js
import { writeFile } from 'fs/promises';   // Module fs pour écrire dans les fichiers, version Promises (fonctionne localement)
import path from 'path';                    // Utilisé pour travailler avec les chemins de fichiers
import { randomUUID } from 'crypto';       // Génère un identifiant unique pour éviter les conflits de noms de fichiers

// Fonction POST exécutée lors de la réception d'un formulaire contenant un fichier
export async function POST(req: NextRequest) {
  try {
    // Récupérer les données du formulaire, incluant les fichiers
    const formData = await req.formData();

    // Extraire le fichier à partir des données du formulaire
    const file = formData.get('file') as File;  // 'file' doit être le nom du champ dans le formulaire

    // Vérifier si un fichier a bien été envoyé
    if (!file) {
      // Si aucun fichier n'a été reçu, retourner une réponse d'erreur 400
      return new Response('Aucun fichier reçu', { status: 400 });
    }

    // Convertir le fichier en arrayBuffer pour pouvoir le manipuler sous forme de buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);  // Convertit l'arrayBuffer en un buffer Node.js utilisable pour l'écriture

    // Créer un nom de fichier unique en utilisant un UUID et le nom original du fichier
    const fileName = `${randomUUID()}-${file.name}`;

    // Déterminer le chemin complet du fichier où il sera enregistré (dans le dossier 'uploads')
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    // Écrire le buffer du fichier dans le système de fichiers au chemin déterminé
    await writeFile(filePath, buffer);

    // Retourner une réponse JSON avec le nom du fichier enregistré
    return new Response(JSON.stringify({ success: true, fileName }), { status: 200 });
  } catch (error) {
    // En cas d'erreur (ex : problème d'écriture sur le disque), loguer l'erreur et retourner une réponse d'erreur 500
    console.error(error);
    return new Response('Erreur interne serveur', { status: 500 });
  }
}
