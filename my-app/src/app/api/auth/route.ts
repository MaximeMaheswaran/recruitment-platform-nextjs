import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../prisma/generated';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../../lib/auth'; // ← on utilise ton utilitaire ici
import { Fascinate_Inline } from 'next/font/google';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const user = await prisma.recruteur.findUnique({
    where: { username },
  });

  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  }
  console.log("user:", user)
  // Utilisation de ta fonction personnalisée pour générer un token
  const token = generateToken({
    id: user.id,
    firstname: user.name,  // Assure-toi que ces champs existent dans la base de données
    lastname: user.lastname,
  });
  
  // Création de la réponse avec les informations de l'utilisateur
  const response = NextResponse.json({
    recruteur: {
      id: user.id,
      firstname: user.name,  // Utilisation de `firstname` et `lastname`
      lastname: user.lastname,
    },
  });

  // Envoi du cookie sécurisé avec le token
  response.cookies.set('recruteur_token', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: '/',
  });

  return response;
}
