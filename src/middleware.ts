import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";

const publicRoutes = [
  { path: "/sign-in", whenAuthenticated: "redirect" },
  { path: "/catalog", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("@nextauth.token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUl = request.nextUrl.clone();
    redirectUl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUl);
  }

  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUl = request.nextUrl.clone();
    redirectUl.pathname = "/";
    return NextResponse.redirect(redirectUl);
  }

  if(authToken && !publicRoute) {
    return NextResponse.next();
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
