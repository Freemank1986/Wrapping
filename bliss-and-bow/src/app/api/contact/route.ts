import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { OCCASIONS } from "@/lib/occasions";

const resend = new Resend(process.env.RESEND_API_KEY);
// Resend's shared sandbox sender — works without a verified domain, but can
// only deliver to the email address the Resend account was created with.
// Once blissandbow.com is verified in Resend, switch this to an
// address on that domain (e.g. "Bliss & Bow <hello@blissandbow.com>").
const FROM_EMAIL = "Bliss & Bow Website <onboarding@resend.dev>";
const TO_EMAIL = "Blissandbowwrapco@gmail.com";

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes. This
// resets on cold start and doesn't share state across serverless instances,
// so it's a light deterrent, not a hard guarantee — swap in Upstash/Vercel
// KV if spam becomes a real problem.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again later." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const name = body?.name;
  const email = body?.email;
  const message = body?.message;
  const occasion = body?.occasion;
  const company = body?.company;

  // Honeypot: real visitors never see or fill this field.
  if (typeof company === "string" && company.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ error: "Please enter your email." }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }
  if (!OCCASIONS.includes(occasion)) {
    return NextResponse.json({ error: "Please choose an occasion." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New contact form message — ${occasion}`,
      text: `Name: ${name}\nEmail: ${email}\nOccasion: ${occasion}\n\n${message}`,
    });
  } catch (err) {
    console.error("[contact] failed to send email", err);
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
