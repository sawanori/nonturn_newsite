import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// LP ドメイン集合
const LP = new Set(["foodphoto-pro.com", "www.foodphoto-pro.com"]);

export function middleware(req: NextRequest) {
  // Host を正規化（小文字＋ポート除去）
  const rawHost = req.headers.get("host") || "";
  const host = rawHost.toLowerCase().split(":")[0];

  const url = req.nextUrl.clone();
  // デバッグパラメータ ?mwtest=1 なら、ミドルウェア生存確認レスポンスを返す
  if (url.searchParams.get("mwtest") === "1") {
    return new Response(`MW OK host=${host} path=${url.pathname}`, {
      status: 200,
      headers: { "x-mw": "alive" },
    });
  }

  // LP 以外は素通し（ヘッダだけ付与）
  if (!LP.has(host)) {
    const res = NextResponse.next();
    res.headers.set("x-mw", "pass:"+host);
    return res;
  }

  // LP ドメイン: "/" と "/form" は実体へ rewrite
  if (url.pathname === "/") {
    url.pathname = "/services/photo/foodphoto";
    const res = NextResponse.rewrite(url);
    res.headers.set("x-mw", "rewrite:/ -> /services/photo/foodphoto");
    return res;
  }

  if (url.pathname === "/form") {
    url.pathname = "/services/photo/foodphoto/form";
    const res = NextResponse.rewrite(url);
    res.headers.set("x-mw", "rewrite:/form -> /services/photo/foodphoto/form");
    return res;
  }

  // その他は 301 で non-turn.com へ
  const res = NextResponse.redirect(
    `https://non-turn.com${url.pathname}${url.search}`,
    301
  );
  res.headers.set("x-mw", "redirect:"+url.pathname);
  return res;
}

// まずは全パスにマッチさせて確実に効かせる
export const config = { matcher: ["/:path*"] };