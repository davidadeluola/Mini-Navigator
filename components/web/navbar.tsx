"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/web/theme-toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create" },
  { href: "/blog", label: "Blog" },
  { href: "/learning", label: "Learning" },
];

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 text-foreground backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-2 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            Mini
            <span className="font-mono text-sm text-muted-foreground">
              Navigator
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Desktop auth buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isLoading ? null : isAuthenticated ? (
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-background text-foreground"
                  onClick={() =>
                    authClient.signOut({
                      fetchOptions: {
                        cache: "no-store",
                        onSuccess: () => {
                          toast.success("Logged out successfully");
                          router.push("/");
                        },
                        onError: (err) => {
                          toast.error(
                            `Logout failed due to: ${err.error.message}`
                          );
                        },
                      },
                    })
                  }
                >
                  LogOut
                </Button>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className={buttonVariants({
                      variant: "outline",
                      className: "bg-background text-foreground",
                    })}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/register"
                    className={buttonVariants({
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Right sidebar drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-background border-l border-border shadow-xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <span className="text-sm font-semibold tracking-tight">
            Mini
            <span className="font-mono text-muted-foreground">Navigator</span>
          </span>
          <button
            className="p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons at the bottom */}
        <div className="mt-auto px-4 py-6 border-t border-border flex flex-col gap-3">
          {isLoading ? null : isAuthenticated ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    cache: "no-store",
                    onSuccess: () => {
                      toast.success("Logged out successfully");
                      setIsMenuOpen(false);
                      router.push("/");
                    },
                    onError: (err) => {
                      toast.error(`Logout failed due to: ${err.error.message}`);
                    },
                  },
                })
              }
            >
              LogOut
            </Button>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full justify-center",
                })}
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsMenuOpen(false)}
                className={buttonVariants({
                  variant: "secondary",
                  className: "w-full justify-center",
                })}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
