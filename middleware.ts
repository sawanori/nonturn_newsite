
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALT_DOMAIN = new Set([
  "foodphoto-pro.com",
  "www.foodphoto-pro.com",
]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (!ALT_DOMAIN.has(host)) return NextResponse.next();

  const url = req.nextUrl.clone();

  // foodphoto-pro.com では "/" → LP ページ
  if (url.pathname === "/") {
    url.pathname = "/services/photo/foodphoto";
    return NextResponse.rewrite(url);
  }

  // "/form" だけは専用ページ
  if (url.pathname === "/form") {
    url.pathname = "/services/photo/foodphoto/form";
    return NextResponse.rewrite(url);
  }

  // それ以外は non-turn.com へリダイレクト
  return NextResponse.redirect(
    `https://non-turn.com${url.pathname}${url.search}`,
    301
  );
}

export const config = {
  matcher: ["/", "/form", "/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
