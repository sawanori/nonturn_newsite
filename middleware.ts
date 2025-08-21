import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LP_HOSTS = new Set([
  "foodphoto-pro.com",
  "www.foodphoto-pro.com",
]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (!LP_HOSTS.has(host)) return NextResponse.next();

  const url = req.nextUrl.clone();
  const isNav = req.headers.get("sec-fetch-mode") === "navigate";
  const isPrefetch = req.headers.get("next-router-prefetch") === "1";

  if (url.pathname === "/") {
    url.pathname = "/services/photo/foodphoto";
    return NextResponse.rewrite(url);
  }
  if (url.pathname === "/form") {
    url.pathname = "/services/photo/foodphoto/form";
    return NextResponse.rewrite(url);
  }

  if (isNav) {
    return NextResponse.redirect(`https://non-turn.com${url.pathname}${url.search}`, 301);
  }
  return new Response(null, { status: 204 }); // prefetch は静かに破棄
}

export const config = {
  // 静的資産を除外しつつ網羅
  matcher: ["/", "/form", "/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};