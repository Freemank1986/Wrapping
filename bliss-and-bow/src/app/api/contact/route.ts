import { NextRequest, NextResponse } from "next/server";

const OCCASIONS = ["Birthday", "Wedding", "Holiday", "Corporate", "Other"] as const;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const name = body?.name;
  const email = body?.email;
  const message = body?.message;
  const occasion = body?.occasion;

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

  // TODO: wire up Resend (or similar) to actually send this as an email to
  // the shop's inbox and/or a confirmation to the sender. For now, just log.
  console.log("[contact] new submission", {
    name,
    email,
    occasion,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
