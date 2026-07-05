import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-serif text-7xl text-gold">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
        This page came unwrapped
      </h1>
      <p className="mt-4 max-w-md text-charcoal/80">
        We couldn&apos;t find what you were looking for. Let&apos;s get you
        back to something beautiful.
      </p>
      <div className="mt-10">
        <Button href="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </main>
  );
}
