import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Restrict access to /admin routes
  // if (url.pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/", req.url)); // Redirect to an unauthorized page or login page
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)',
  ],
};
