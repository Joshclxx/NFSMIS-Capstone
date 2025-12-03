import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/"]; //dito josh lagay mo lang mga routes mo like ['/profile', '/dashboard']
const AUTH_ROUTES = ["/login"];
const SESSION_COOKIE_NAME = "session"; //change this later

export function authMiddleware(req: NextRequest) {
  console.log("Im here at middleware handler")
  const { pathname } = req.nextUrl;
  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  if (!isProtectedRoute || !sessionToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl)); //change the dashboard if uts not the home pa ge
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
