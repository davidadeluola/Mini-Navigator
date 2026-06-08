import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

// Create a new post with the given title and content

// client
export const createPost = mutation({
  args: { title: v.string(), content: v.string() },

  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    // server
    const newPostId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      authorId: "david adeluola",
    });

    return newPostId;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return posts;
  },
});

export const generateUpload = mutation({
  args: {},
  handler: async (ctx, args) => {

  }
})