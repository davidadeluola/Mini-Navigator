import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const AuthLayout = ({ children }: { children: ReactNode }): React.ReactNode => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-muted/70 via-background to-background" />

      <button className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
        <Link
          href="/"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          <ArrowLeft className="mr-2 inline-block size-4" />
          Back to Home
        </Link>
      </button>

      <div className="w-full max-w-7xl sm:p-8">{children}</div>
    </div>
  );
};

export default AuthLayout;
