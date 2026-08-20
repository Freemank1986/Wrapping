"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-xs uppercase tracking-wide text-charcoal/70 hover:text-burgundy hover:underline underline-offset-4 disabled:opacity-50"
    >
      {loading ? "Logging out…" : "Log Out"}
    </button>
  );
}
