// Fichier API pour les opérations CRUD sur un candidat spécifique (par ID)

// Import du client Prisma personnalisé
import { prisma } from '../../../../../lib/prisma';  // Assurez-vous que le chemin vers Prisma est correct

// Importation des types nécessaires pour gérer les requêtes HTTP dans l'app directory de Next.js
import { NextRequest, NextResponse } from 'next/server';

// --- GET: Récupérer un candidat par son ID ---
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;  // Récupération de l'ID du candidat depuis l'URL

  // Vérifie si l'ID est un nombre valide
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    // Recherche du candidat dans la base de données via Prisma
    const candidate = await prisma.candidate.findUnique({
      where: { id: parseInt(id) },  // Conversion en nombre entier
    });

    // Si aucun candidat n'est trouvé avec cet ID
    if (!candidate) {
      return NextResponse.json({ error: 'Candidat non trouvé' }, { status: 404 });
    }

    // Renvoi du candidat trouvé avec un statut HTTP 200
    return NextResponse.json(candidate, { status: 200 });
  } catch (error) {
    // Gestion des erreurs serveur
    console.error('Erreur lors de la récupération du candidat:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// --- PUT: Mettre à jour un candidat ---
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Récupération des champs à mettre à jour depuis le body de la requête
  const { name, lastname, status } = await req.json();

  // Vérifie si l'ID est un nombre valide
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    // Mise à jour du candidat avec les nouvelles données
    const updatedCandidate = await prisma.candidate.update({
      where: { id: parseInt(id) },
      data: {
        name,
        lastname,
        status,
      },
    });

    // Renvoi du candidat mis à jour
    return NextResponse.json(updatedCandidate, { status: 200 });
  } catch (error) {
    // Gestion des erreurs serveur
    console.error('Erreur lors de la mise à jour du candidat:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// --- DELETE: Supprimer un candidat ---
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Vérifie si l'ID est un nombre valide
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    // Suppression du candidat de la base de données
    await prisma.candidate.delete({
      where: { id: parseInt(id) },
    });

    // Renvoi d’un message de confirmation
    return NextResponse.json({ message: 'Candidat supprimé avec succès' }, { status: 200 });
  } catch (error) {
    // Gestion des erreurs serveur
    console.error('Erreur lors de la suppression du candidat :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
``
