import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const IDN_HOSTS = new Set([
  "xn--hxtwsw9j6o7dyca.com",
  "www.xn--hxtwsw9j6o7dyca.com",
]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  
  // 飲食撮影.comドメインの場合のみ処理
  if (!IDN_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // "/" はLPページにリライト
  if (pathname === "/") {
    url.pathname = "/services/photo/foodphoto";
    return NextResponse.rewrite(url);
  }

  // "/form" はフォームページにリライト
  if (pathname === "/form") {
    url.pathname = "/services/photo/foodphoto/form";
    return NextResponse.rewrite(url);
  }

  // 静的アセットとAPIルートは処理しない
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|woff|woff2|ttf|otf)$/i)
  ) {
    return NextResponse.next();
  }

  // その他のすべてのパスはnon-turn.comへ301リダイレクト
  return NextResponse.redirect(
    `https://non-turn.com${pathname}${url.search}`,
    301
  );
}

export const config = {
  // すべてのパスに対してmiddlewareを実行（静的アセットは内部で除外）
  matcher: "/(.*)",
};