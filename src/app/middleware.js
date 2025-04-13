import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function middleware(request) {
  console.log("Middleware triggered for:", request.url);
  // Allow public routes
  const publicPaths = ["/auth/login", "/auth/register"];
  if (publicPaths.includes(request.nextUrl.pathname)) {
    console.log("Public path detected:", request.nextUrl.pathname);
    return NextResponse.next();
  }

  // Check session for protected routes
  const session = await getServerSession(request, authOptions);
  console.log("Session check:", session);

  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("No session, redirecting to /auth/login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  console.log("Access granted for:", request.url);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect /dashboard and its subroutes
  runtime: "nodejs", // Avoid edge runtime issues
};