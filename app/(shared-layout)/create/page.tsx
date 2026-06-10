"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { createBlogSchema, type CreateBlogSchema } from "@/schemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import { z } from "zod/v3";

import { createPostAction } from "@/app/action";
// import { Id } from "@/convex/betterAuth/_generated/dataModel";
const Create = () => {
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // const mutation = useMutation(api.posts.createPost);

  const form = useForm<CreateBlogSchema>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  // ✅ Fix 1: Added `values` parameter
  const onSubmit = async (values: z.infer<typeof createBlogSchema>) => {
    startTransition(async () => {
      try {
        // await mutation({
        //   title: values.title,
        //   content: values.content,
        //   // authorId: Id<users>,
        // });

        await createPostAction(values);

        // uncomment to test API route without Convex and route handler via createPostAction http

        // await Axios.post("/api/create-blog", {
        //   title: values.title,
        //   content: values.content,
        //   image: values.image, // Handle file upload separately
        // });

        toast.success("Blog created successfully");
        form.reset();
        // router.push("/"); // Redirect to home page after creation
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err?.message || "Failed to create blog");
        }
      }
    });
  };

  return (
    // ✅ Fix 2: Outer wrapper now has proper centering + padding
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* ✅ Fix 3: Header centered properly */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-2xl">
          Create New Item
        </h1>
        <p className="text-muted-foreground text-sm pt-2">Craft your Idea...</p>
      </div>

      {/* ✅ Fix 4: Card takes full parent width — parent controls max width */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>
            Create a new blog article for your audience.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* ✅ Fix 5: Removed redundant max-w and mt-8 from form */}
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter blog title"
                      aria-invalid={fieldState.invalid}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-ring"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="content">Content</FieldLabel>
                    {/* ✅ Fix 6: h-10 → min-h-32 so textarea is actually usable */}
                    <Textarea
                      id="content"
                      placeholder="Enter blog content"
                      aria-invalid={fieldState.invalid}
                      className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring resize-y"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="image">Image</FieldLabel>
                    {/* ✅ Fix 6: h-10 → min-h-32 so textarea is actually usable */}
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      aria-invalid={fieldState.invalid}
                      className="min-h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring"
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file ?? null);
                      }}
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
                <span>Create Blog</span>
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;
