import { NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';  // Tu peux utiliser fs en local
import path from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // Récupérer le formulaire et le fichier
    const formData = await req.formData();
    const file = formData.get('file') as File;

    // Vérifier si un fichier est bien présent
    if (!file) {
      return new Response('Aucun fichier reçu', { status: 400 });
    }

    // Convertir le fichier en buffer pour pouvoir l'enregistrer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer un nom de fichier unique pour éviter les conflits
    const fileName = `${randomUUID()}-${file.name}`;

    // Déterminer le chemin complet pour enregistrer le fichier
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    // Créer le dossier si nécessaire
    await writeFile(filePath, buffer);

    // Retourner une réponse avec le nom du fichier enregistré
    return new Response(JSON.stringify({ success: true, fileName }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Erreur interne serveur', { status: 500 });
  }
}
