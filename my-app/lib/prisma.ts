// Importation du client Prisma généré automatiquement à partir du schéma
import { PrismaClient } from '../prisma/generated';

// Création d'une variable globale typée pour stocker une instance de PrismaClient
// Cela évite de recréer une nouvelle instance à chaque rechargement (utile surtout en développement avec Next.js)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

// Initialisation de Prisma : si une instance existe déjà, on la réutilise, sinon on en crée une nouvelle
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ['query'] })  // Le log 'query' permet d'afficher les requêtes exécutées dans la console

// En développement, on attache l'instance Prisma à l'objet global pour éviter les multiples instances lors des rechargements
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
