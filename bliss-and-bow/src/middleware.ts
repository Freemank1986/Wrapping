import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, sha256Hex } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    // Admin isn't configured — block access entirely rather than leaving
    // the dashboard reachable with no way to authenticate against it.
    return new NextResponse("Admin dashboard isn't configured.", { status: 503 });
  }

  const expected = await sha256Hex(password);
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (cookie === expected) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
