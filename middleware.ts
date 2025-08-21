;
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LP_HOSTS = new Set([
  "foodphoto-pro.com",
  "www.foodphoto-pro.com",
]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  // === Debug logs ===
  console.log("[MIDDLEWARE] host:", host);
  console.log("[MIDDLEWARE] pathname:", url.pathname);

  if (!LP_HOSTS.has(host)) {
    console.log("[MIDDLEWARE] Not LP host → NextResponse.next()");
    return NextResponse.next();
  }

  if (url.pathname === "/") {
    console.log("[MIDDLEWARE] Rewriting / → /services/photo/foodphoto");
    url.pathname = "/services/photo/foodphoto";
    return NextResponse.rewrite(url);
  }

  if (url.pathname === "/form") {
    console.log("[MIDDLEWARE] Rewriting /form → /services/photo/foodphoto/form");
    url.pathname = "/services/photo/foodphoto/form";
    return NextResponse.rewrite(url);
  }

  console.log("[MIDDLEWARE] Redirecting to non-turn.com:", url.pathname);
  return NextResponse.redirect(
    `https://non-turn.com${url.pathname}${url.search}`,
    301
  );
}

export const config = {
  matcher: ["/", "/form", "/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
