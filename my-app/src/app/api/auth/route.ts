// Importation des types et fonctions nécessaires depuis Next.js
import { NextRequest, NextResponse } from 'next/server';

// Importation du client Prisma pour accéder à la base de données
import { PrismaClient } from '../../../../prisma/generated';

// Importation de bcryptjs pour comparer les mots de passe de façon sécurisée
import bcrypt from 'bcryptjs';

// Importation de la fonction utilitaire qui génère un token JWT
import { generateToken } from '../../../../lib/auth';


// Initialisation du client Prisma
const prisma = new PrismaClient();

// Fonction asynchrone exécutée lors d'une requête POST à cette route
export async function POST(request: NextRequest) {
  // Extraction du nom d'utilisateur et du mot de passe depuis le corps de la requête
  const { username, password } = await request.json();

  // Recherche de l'utilisateur dans la table "recruteur" par son nom d'utilisateur
  const user = await prisma.recruteur.findUnique({
    where: { username },
  });

  // Vérification de l'existence de l'utilisateur et de la validité du mot de passe
  // - user doit exister
  // - son mot de passe doit exister
  // - le mot de passe fourni doit correspondre au hash stocké
  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  }

  console.log("user:", user);  // Affichage en console de l'utilisateur connecté (à retirer en production)

  // Génération du token JWT avec les informations du recruteur
  const token = generateToken({
    id: user.id,
    firstname: user.name,     // `name` correspond ici à `firstname`
    lastname: user.lastname,  // Champ du nom de famille
  });
  
  // Construction de la réponse JSON à envoyer au client
  const response = NextResponse.json({
    recruteur: {
      id: user.id,
      firstname: user.name,
      lastname: user.lastname,
    },
  });

  // Ajout du token JWT dans un cookie nommé 'recruteur_token'
  response.cookies.set('recruteur_token', token, {
    httpOnly: false,                                // Attention : à mettre sur true pour plus de sécurité
    secure: process.env.NODE_ENV === 'production',  // Le cookie est sécurisé uniquement en production
    maxAge: 60 * 60 * 24 * 7,                        // Durée de vie du cookie : 7 jours
    path: '/',                                       // Le cookie est accessible sur tout le site
  });

  // Retour de la réponse complète
  return response;
}
