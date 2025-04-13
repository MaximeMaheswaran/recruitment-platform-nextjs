import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('recruteur_token')?.value;

  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/rh/:path*'], // Protège toutes les routes sous /rh
};
