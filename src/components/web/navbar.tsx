"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create" },
];

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 text-foreground backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-2 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Mini
          <span className="font-mono text-sm text-muted-foreground">
            Navigator
          </span>
        </Link>

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

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
