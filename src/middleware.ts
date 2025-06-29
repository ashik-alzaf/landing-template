import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  const isLoginRoute = request.nextUrl.pathname === "/sign-up";
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  } else if (token && isLoginRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-up"],
};
