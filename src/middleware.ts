import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // API routes should be handled normally
  if (url.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Google verification files for non-turn.com
  if (url.pathname.startsWith("/google") && url.pathname.endsWith(".html")) {
    return NextResponse.next();
  }

  // Chat and admin routes are handled normally
  if (url.pathname === "/chat" || url.pathname.startsWith("/chat/") || url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // All other routes pass through
  return NextResponse.next();
}

// Apply middleware to all paths
export const config = { matcher: ["/:path*"] };