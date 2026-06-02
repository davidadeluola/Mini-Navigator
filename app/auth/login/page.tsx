"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchema } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginSchema) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: values.email,
        password: values.password,
        fetchOptions: {
          cache: "no-store",
          onError: (err) => {
            toast.error(err.error.message);
          },
          onSuccess: () => {
            toast.success(`Welcome back!, ${values.email}`);
            router.push("/");
          },
        },
      });
    });
  };

  return (
    <main className="flex items-center justify-center  px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <Card className=" w-full max-w-md rounded-xl border border-border bg-card shadow-sm sm:p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to continue to your dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="mt-2 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={fieldState.invalid}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      aria-invalid={fieldState.invalid}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </FieldGroup>

            <button
              type="submit"
              className={buttonVariants({ className: "mt-2 w-full" })}
              disabled={isPending}
            >
              {isPending ? <>
              <Loader2 className="animate-spin" />
              <span>Loading...</span>
                </> : <span>Log In</span>}
            </button>
          </form>
        </CardContent>

        <CardFooter className="justify-center border-t border-border pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-foreground hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
