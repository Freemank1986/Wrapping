"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard/admin/orders", label: "Orders" },
  { href: "/dashboard/admin/pricing", label: "Pricing" },
  { href: "/dashboard/admin/leads", label: "Leads" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex gap-2 border-b border-border">
      {links.map((link) => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
