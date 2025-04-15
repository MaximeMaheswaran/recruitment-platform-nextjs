// Importation du client Prisma pour interagir avec la base de données
import { prisma } from '../../../../lib/prisma'

// --- GET: Récupérer tous les candidats ---
export async function GET() {
    // Utilise Prisma pour récupérer tous les candidats dans la table "candidate"
    const candidates = await prisma.candidate.findMany()

    // Retourne la liste des candidats sous forme de réponse JSON
    return Response.json(candidates)
}

// --- POST: Créer un nouveau candidat ---
export async function POST(request: Request) {
    // Récupère les données envoyées dans le body de la requête
    const data = await request.json()

    // Crée un nouveau candidat dans la base de données avec les données reçues
    const newCandidate = await prisma.candidate.create({
        data: {
            name: data.name,                 // Prénom du candidat
            lastname: data.lastname,         // Nom de famille
            email: data.email,               // Email
            tel: data.tel,                   // Numéro de téléphone
            poste: data.poste,               // Poste souhaité
            message: data.message,           // Message de motivation
            cv: data.cv || '',               // CV (optionnel, vide par défaut)
            status: data.status || 'Nouveau' // Statut par défaut : "Nouveau"
        }
    })

    // Retourne le nouveau candidat créé
    return Response.json(newCandidate)
}
