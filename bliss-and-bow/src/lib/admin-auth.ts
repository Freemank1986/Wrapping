// Shared by middleware.ts (edge runtime) and the admin login/logout API
// routes (node runtime), so this only uses Web Crypto — no "server-only"
// or Node-specific APIs — to stay compatible with both.
export const ADMIN_COOKIE_NAME = "admin_session";

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
