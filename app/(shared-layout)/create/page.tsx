"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { createBlogSchema, POST_TAGS, type CreateBlogSchema } from "@/schemas/blog";
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
import { Loader2, PenLine, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod/v3";
import { createPostAction } from "@/app/action";

const tagColors: Record<string, string> = {
  Building: "border-violet-500/30 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20",
  Tech: "border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20",
  Craft: "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
  Life: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
  Design: "border-pink-500/30 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20",
  Tutorial: "border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20",
};

const Create = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateBlogSchema>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      tag: undefined,
      image: undefined,
    },
  });

  const selectedTag = form.watch("tag");

  const onSubmit = async (values: z.infer<typeof createBlogSchema>) => {
    startTransition(async () => {
      try {
        await createPostAction(values);
        toast.success("Blog created successfully");
        form.reset();
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err?.message || "Failed to create blog");
        }
      }
    });
  };

  return (
    <div>
      {/* Page header */}
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-violet-400 mb-6 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5">
          <Sparkles className="w-3.5 h-3.5" />
          New post
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
          Create Article
        </h1>
        <p className="text-base text-white/40 leading-relaxed">
          Craft your idea and share it with the world.
        </p>
      </div>

      {/* Form card */}
      <Card className="bg-white/[0.03] border-white/[0.08] backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <PenLine className="w-5 h-5 text-violet-400" />
            New Blog Article
          </CardTitle>
          <CardDescription className="text-white/35">
            Fill in the details below to publish your post.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup>
              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title" className="text-white/60">
                      Title
                    </FieldLabel>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter blog title"
                      aria-invalid={fieldState.invalid}
                      className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus-visible:border-violet-500/50"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Tag selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">
                  Tag
                </label>
                <div className="flex flex-wrap gap-2">
                  {POST_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        form.setValue(
                          "tag",
                          selectedTag === tag ? undefined : tag
                        );
                      }}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                        selectedTag === tag
                          ? tagColors[tag] ??
                            "border-white/20 bg-white/10 text-white"
                          : "border-white/8 bg-white/[0.03] text-white/35 hover:bg-white/[0.06] hover:text-white/50"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="content" className="text-white/60">
                      Content
                    </FieldLabel>
                    <Textarea
                      id="content"
                      placeholder="Write your blog content..."
                      aria-invalid={fieldState.invalid}
                      className="min-h-36 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus-visible:border-violet-500/50 resize-y"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Image */}
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="image" className="text-white/60">
                      Cover Image
                    </FieldLabel>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      aria-invalid={fieldState.invalid}
                      className="min-h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60 outline-none transition-colors focus-visible:border-violet-500/50 file:text-violet-400 file:border-0 file:bg-transparent file:text-sm file:font-medium"
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
              className={buttonVariants({
                className:
                  "mt-2 w-full bg-violet-600 hover:bg-violet-500 text-white border-0 h-11 text-sm font-medium",
              })}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  <span>Publishing...</span>
                </>
              ) : (
                <span>Publish Article</span>
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;
