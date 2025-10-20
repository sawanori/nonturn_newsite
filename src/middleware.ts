import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  // Redirect foodphoto-pro.com to non-turn.com
  if (host.includes("foodphoto-pro.com")) {
    return NextResponse.redirect(
      new URL(`https://non-turn.com${url.pathname}${url.search}`, req.url),
      301
    );
  }

  // All other routes pass through normally
  return NextResponse.next();
}

// Apply middleware to all paths
export const config = { matcher: ["/:path*"] };