import { requireAdmin } from "@/lib/dal";
import { AdminNav } from "@/components/admin-nav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold">Admin</h1>
        <p className="mt-1 text-muted-foreground">Manage orders, pricing, and leads.</p>
      </div>
      <AdminNav />
      {children}
    </div>
  );
}
