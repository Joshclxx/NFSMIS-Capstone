import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/admin/dashboard", "/profile", "/student"];
const AUTH_ROUTES = ["/"];
const SESSION_COOKIE_NAME = "session";

export default function middleware(req: NextRequest) {
  console.log("Middleware is running...");

  const { pathname } = req.nextUrl;
  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)/"],
};
