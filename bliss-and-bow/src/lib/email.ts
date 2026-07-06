import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend's shared sandbox sender — works without a verified domain, but can
// only deliver to the email address the Resend account was created with.
// Once blissandbow.com is verified in Resend, switch this to an address on
// that domain (e.g. "Bliss & Bow <hello@blissandbow.com>").
const FROM_EMAIL = "Bliss & Bow Website <onboarding@resend.dev>";
const SHOP_EMAIL = "Blissandbowwrapco@gmail.com";

export async function sendShopEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: SHOP_EMAIL,
    replyTo,
    subject,
    text,
  });
}
