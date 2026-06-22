import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const getCommentsByPostId = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .order("desc")
      .collect();

    return comments;
  },
});

export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
    // authorName: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const newCommentId = await ctx.db.insert("comments", {
      postId: args.postId,
      content: args.content,
      authorId: user._id,
      authorName: user.name ?? "Anonymous", // Fallback to "Anonymous" if authorName is not provided
    });

    return newCommentId;
  },
});
