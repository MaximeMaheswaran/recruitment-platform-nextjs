// src/app/api/candidates/[id]/route.ts
import { prisma } from '../../../../../lib/prisma';  // Assurez-vous que votre connexion Prisma est correcte
import { NextRequest, NextResponse } from 'next/server'; // Utilisez NextRequest et NextResponse dans app/

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;  // Récupérer l'ID du candidat depuis l'URL

  // Vérifier si l'ID est valide
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    // Récupérer le candidat depuis la base de données
    const candidate = await prisma.candidate.findUnique({
      where: { id: parseInt(id) },  // Recherche par ID
    });

    // Si le candidat n'est pas trouvé
    if (!candidate) {
      return NextResponse.json({ error: 'Candidat non trouvé' }, { status: 404 });
    }

    // Retourner le candidat trouvé
    return NextResponse.json(candidate, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération du candidat:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, lastname, status } = await req.json();

  // Vérifier si l'ID est valide
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    // Mettre à jour le candidat dans la base de données
    const updatedCandidate = await prisma.candidate.update({
      where: { id: parseInt(id) },
      data: {
        name,
        lastname,
        status,
      },
    });

    return NextResponse.json(updatedCandidate, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du candidat:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    await prisma.candidate.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Candidat supprimé avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la suppression du candidat :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
