// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware runs before protected routes
export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ["/dashboard"];

  // 1. If accessing protected route & not logged in → redirect to login
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 2. If logged in and tries to access /login → redirect to dashboard
  if (pathname === "/login" && token) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // 3. Allow all other requests
  return NextResponse.next();
}

// middleware.ts continued
export const config = {
  matcher: ["/dashboard/:path*", "/login"], // Apply middleware only to these paths
};
