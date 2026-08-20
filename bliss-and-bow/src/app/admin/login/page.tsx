import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admin Login",
  description: "Bliss & Bow admin dashboard login.",
  path: "/admin/login",
  noIndex: true,
});

export default function AdminLoginPage() {
  return (
    <main className="py-24">
      <Container>
        <SectionHeading eyebrow="Admin" title="Log In" />
        <div className="mx-auto mt-16 max-w-sm">
          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
