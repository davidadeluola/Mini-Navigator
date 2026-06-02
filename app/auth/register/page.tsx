"use client";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupSchema } from "@/schemas/auth";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const reForm = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupSchema) => {
    startTransition(async () => {
      await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        fetchOptions: {
          cache: "no-store",
          onError: (err) => {
            toast.error(err.error.message);
          },
          onSuccess: () => {
            toast.success(
              `${values.name}, your account has been created successfully!`
            );
            router.push("/auth/login");
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
            Register
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="mt-2 space-y-4"
            onSubmit={reForm.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup>
              <Controller
                name="name"
                control={reForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="David Ville"
                      aria-invalid={fieldState.invalid}
                      {...field}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring"
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={reForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="david@ville.com"
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
                control={reForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
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
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </form>
        </CardContent>

        <CardFooter className="justify-center border-t border-border pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-foreground hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
