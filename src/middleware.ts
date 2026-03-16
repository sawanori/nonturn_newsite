import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AB_COOKIE_NAME = 'ab_variant'

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

  // A/B test variant assignment
  const response = NextResponse.next();
  const existingVariant = req.cookies.get(AB_COOKIE_NAME)?.value

  if (existingVariant !== 'A' && existingVariant !== 'B') {
    const variant = Math.random() < 0.5 ? 'A' : 'B'
    response.cookies.set(AB_COOKIE_NAME, variant, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  }

  return response;
}

// Apply middleware to all paths
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};