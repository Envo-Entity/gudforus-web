import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/isHealthy" || pathname.startsWith("/isHealthy/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/isHealthy/, "/ishealthy");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/isHealthy", "/isHealthy/:path*"],
};
