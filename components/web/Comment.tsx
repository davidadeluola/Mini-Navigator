"use client";

import { useTransition } from "react";
import { useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, Preloaded, usePreloadedQuery } from "convex/react";
import { toast } from "sonner";
import { MessageSquareIcon, Loader2 } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { commentSchema, CommentSchemaType } from "@/schemas/comments";

import { buttonVariants } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CommentSection = (props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) => {
  const params = useParams<{ postId: Id<"posts"> }>();

  const [isPending, startTransition] = useTransition();
  const createCommentMutation = useMutation(api.comments.createComment);
  const comments = usePreloadedQuery(props.preloadedComments);

  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId: params.postId,
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      try {
        await createCommentMutation(values as CommentSchemaType);
        toast.success("Comment created successfully");
        form.reset({ postId: params.postId, content: "" });
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message || "Comment Creation Failed");
        }
      }
    });
  };

  return (
    <div className="glass-card p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquareIcon className="w-5 h-5 text-violet-400" />
        <h4 className="text-lg font-semibold text-white">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h4>
      </div>

      {/* Comment Form */}
      <form
        className="space-y-4 mb-8"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="comment-content" className="text-white/60">
                Leave a comment
              </FieldLabel>
              <Textarea
                id="comment-content"
                placeholder="Share your thoughts..."
                aria-invalid={fieldState.invalid}
                className="min-h-24 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus-visible:border-violet-500/50 resize-y"
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <button
          type="submit"
          className={buttonVariants({
            className:
              "w-full bg-violet-600 hover:bg-violet-500 text-white border-0 h-10 text-sm font-medium",
          })}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Post Comment</span>
          )}
        </button>
      </form>

      {/* Divider */}
      {comments.length > 0 && (
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-white/5" />
        </div>
      )}

      {/* Comment List */}
      <section className="space-y-4">
        {comments.length === 0 ? (
          <p className="py-6 text-sm text-center text-white/30">
            No comments yet. Be the first.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-4 py-4 border-b border-white/5 last:border-0"
            >
              <Avatar className="shrink-0 size-10 border border-white/10">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${comment.authorId}?rounded=70`}
                  alt={`${comment.authorName}'s avatar`}
                />
                <AvatarFallback className="bg-violet-500/10 text-violet-400 text-sm">
                  {comment.authorName?.charAt(0).toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/80">
                    {comment.authorName}
                  </span>
                  <span className="text-[11px] text-white/25">
                    {new Date(comment._creationTime).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap text-white/50 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default CommentSection;