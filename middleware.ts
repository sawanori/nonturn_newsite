import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const IDN_HOSTS = new Set([
  "xn--yfrq8xczdsu2e.com",        // 飲食店撮影.com（正）
  "www.xn--yfrq8xczdsu2e.com",
]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (!IDN_HOSTS.has(host)) return NextResponse.next();

  const url = req.nextUrl.clone();
  const isNav = req.headers.get("sec-fetch-mode") === "navigate";
  const isPrefetch = req.headers.get("next-router-prefetch") === "1";

  // IDNでは "/" と "/form" だけ LP 実体にrewrite
  if (url.pathname === "/") {
    url.pathname = "/services/photo/foodphoto";
    return NextResponse.rewrite(url);
  }
  if (url.pathname === "/form") {
    url.pathname = "/services/photo/foodphoto/form";
    return NextResponse.rewrite(url);
  }

  // それ以外: クリック遷移は non-turn へ 301、プリフェッチ等は静かに無視
  if (isNav) {
    return NextResponse.redirect(`https://non-turn.com${url.pathname}${url.search}`, 301);
  }
  return new Response(null, { status: 204 });
}

// 静的資産を除外しつつ網羅
export const config = {
  matcher: ["/", "/form", "/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};