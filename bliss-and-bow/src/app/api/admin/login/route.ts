import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, sha256Hex } from "@/lib/admin-auth";

// Simple in-memory rate limit: 5 attempts per IP per 10 minutes, to slow
// down brute-forcing the single shared admin password. Resets on cold
// start and doesn't share state across serverless instances — a light
// deterrent, not a hard guarantee.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const attemptsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (attemptsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  attemptsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Admin dashboard isn't configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (typeof password !== "string" || password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const sessionValue = await sha256Hex(adminPassword);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/admin",
  });
  return response;
}
