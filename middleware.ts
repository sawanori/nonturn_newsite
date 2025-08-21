import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LP_DOMAINS = new Set(["foodphoto-pro.com", "www.foodphoto-pro.com"]);

export function middleware(req: NextRequest) {
  // Host を正規化（小文字化・ポート除去）
  const rawHost = req.headers.get("host") || "";
  const host = rawHost.toLowerCase().split(":")[0];

  if (!LP_DOMAINS.has(host)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  const isNav = req.headers.get("sec-fetch-mode") === "navigate";
  const isPrefetch = req.headers.get("next-router-prefetch") === "1";

  // "/" を LP 実体へ rewrite
  if (url.pathname === "/") {
    url.pathname = "/services/photo/foodphoto";
    const res = NextResponse.rewrite(url);
    res.headers.set("x-mw-hit", "lp-root");
    return res;
  }

  // "/form" を LP 実体へ rewrite
  if (url.pathname === "/form") {
    url.pathname = "/services/photo/foodphoto/form";
    const res = NextResponse.rewrite(url);
    res.headers.set("x-mw-hit", "lp-form");
    return res;
  }

  // それ以外:
  // クリック遷移は non-turn.com へ 301、プリフェッチ等は 204 で静かに破棄
  if (isNav) {
    const res = NextResponse.redirect(
      `https://non-turn.com${url.pathname}${url.search}`,
      301
    );
    res.headers.set("x-mw-hit", "lp-redirect");
    return res;
  }
  return new Response(null, { status: 204, headers: { "x-mw-hit": "lp-drop" } });
}

// すべてのパスで適用（まずは確実に効かせる）
export const config = {
  matcher: ["/:path*"],
};