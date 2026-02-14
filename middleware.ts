import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get user from cookie (in production, this would be a proper session/JWT)
  const userCookie = request.cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  // If not logged in, redirect to login
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based access control
  if (pathname.startsWith('/supplier') && user.role !== 'supplier') {
    return NextResponse.redirect(new URL(`/${user.role}/dashboard`, request.url));
  }
  if (pathname.startsWith('/business') && user.role !== 'business') {
    return NextResponse.redirect(new URL(`/${user.role}/dashboard`, request.url));
  }
  if (pathname.startsWith('/client') && user.role !== 'client') {
    return NextResponse.redirect(new URL(`/${user.role}/dashboard`, request.url));
  }
  if (pathname.startsWith('/delivery') && user.role !== 'delivery') {
    return NextResponse.redirect(new URL(`/${user.role}/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/supplier/:path*',
    '/business/:path*',
    '/client/:path*',
    '/delivery/:path*',
  ],
};
