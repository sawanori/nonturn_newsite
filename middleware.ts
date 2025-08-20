// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const IDN = new Set([
  "xn--hxtwsw9j6o7dyca.com",        // 飲食撮影.com
  "www.xn--hxtwsw9j6o7dyca.com",
]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (!IDN.has(host)) return NextResponse.next();

  const url = req.nextUrl.clone();

  // IDN では "/" と "/form" だけ LP を表示
  if (url.pathname === "/") {
    url.pathname = "/services/photo/foodphoto";
    return NextResponse.rewrite(url);
  }
  if (url.pathname === "/form") {
    url.pathname = "/services/photo/foodphoto/form";
    return NextResponse.rewrite(url);
  }

  // それ以外は non-turn.com へ 301
  return NextResponse.redirect(
    `https://non-turn.com${url.pathname}${url.search}`,
    301
  );
}

export const config = {
  matcher: ["/", "/form", "/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};