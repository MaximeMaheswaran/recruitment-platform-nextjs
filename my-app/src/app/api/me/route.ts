// src/app/api/me/route.ts

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookie = (await cookies()).get('session');

  if (!cookie) {
    return NextResponse.json({ error: 'Non connecté' }, { status: 401 });
  }

  const user = JSON.parse(cookie.value);
  return NextResponse.json({ user });
}
