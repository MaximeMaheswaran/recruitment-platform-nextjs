import { prisma } from '../../../../lib/prisma'

export async function GET() {
    const candidates = await prisma.candidate.findMany()
    return Response.json(candidates)
}

export async function POST(request: Request) {
    const data = await request.json()
    const newCandidate = await prisma.candidate.create({
        data: {
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            tel: data.tel,
            poste: data.poste,
            message: data.message,
            cv: data.cv || '',
            status: data.status || 'Nouveau',
        }
    })
    return Response.json(newCandidate)
}