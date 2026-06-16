import { z } from "zod/v3";
import { Id } from "@/convex/_generated/dataModel";

export const commentSchema = z.object({
  postId: z.custom<Id<"posts">>(), // Assuming postId is a string (Convex ID)
  content: z.string().min(1).max(1000),
//   authorId: z.string(), // Assuming authorId is a string (Convex ID)
  // authorName: z.string().min(1).max(100),
});

export type CommentSchemaType = z.infer<typeof commentSchema>;
