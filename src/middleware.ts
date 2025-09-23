import { NextRequest, NextResponse } from "next/server";
import { auth } from "./server/auth";
import { headers } from "next/headers";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
 
  // Redirect unauthenticated users away from protected pages
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Optional: redirect logged-in users away from auth pages
  if (session && (pathname === "/login" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/dashboard/:path*", // only protect dashboard pages
    "/login", // run also on login
    "/sign-up", // run also on signup
    "/(api|trpc)(.*)", // always run on API routes
  ],
};
