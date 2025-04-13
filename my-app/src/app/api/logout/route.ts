import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  (await cookieStore).set('recruteur_token', '', {
    maxAge: -1,
    path: '/',
  });

  return NextResponse.json({ message: 'Déconnecté' });
}
