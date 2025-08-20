import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const IDN_HOSTS = new Set([
  "xn--hxtwsw9j6o7dyca.com",
  "www.xn--hxtwsw9j6o7dyca.com",
]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (!IDN_HOSTS.has(host)) return NextResponse.next();

  const url = req.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = "/services/photo/foodphoto";
    return NextResponse.rewrite(url);
  }
  if (url.pathname === "/form") {
    url.pathname = "/services/photo/foodphoto/form";
    return NextResponse.rewrite(url);
  }

  return NextResponse.redirect(
    `https://non-turn.com${url.pathname}${url.search}`,
    301
  );
}

export const config = {
  // 静的資産を除外しつつ網羅
  matcher: ["/", "/form", "/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};