import Link from "next/link";
import { Menu } from "lucide-react";
import { getCurrentUser } from "@/lib/dal";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";
import { LogoMark } from "@/components/brand/logo-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { BRAND } from "@/lib/brand";
import type { SiteTheme } from "@/lib/theme";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/workshops", label: "Workshops" },
  { href: "/partners", label: "For Boutiques" },
];

export async function SiteHeader({ theme }: { theme: SiteTheme }) {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold">
          <LogoMark id="classic-header-bow" className="h-7 w-7" />
          {BRAND.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle current={theme} />
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href={user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard"}>
                  Dashboard
                </Link>
              </Button>
              <form action={logout}>
                <Button variant="outline" type="submit">
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/book">Book now</Link>
              </Button>
            </>
          )}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="top-0 translate-y-0 rounded-none border-x-0 border-t-0 sm:max-w-none">
            <DialogTitle className="sr-only">Menu</DialogTitle>
            <nav className="flex flex-col gap-4 py-4 text-lg">
              {navLinks.map((link) => (
                <DialogClose asChild key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </DialogClose>
              ))}
              <div className="my-2 h-px bg-border" />
              <div className="text-sm">
                <ThemeToggle current={theme} />
              </div>
              <div className="my-2 h-px bg-border" />
              {user ? (
                <>
                  <DialogClose asChild>
                    <Link href={user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard"}>
                      Dashboard
                    </Link>
                  </DialogClose>
                  <form action={logout}>
                    <button type="submit" className="text-left">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <DialogClose asChild>
                    <Link href="/login">Log in</Link>
                  </DialogClose>
                  <DialogClose asChild>
                    <Link href="/book" className="font-semibold text-accent">
                      Book now
                    </Link>
                  </DialogClose>
                </>
              )}
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
