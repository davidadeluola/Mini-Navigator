// posts.ts
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageId: v.optional(v.id("_storage")), // ✅ matches schema + correct type
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const newPostId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      imageId: args.imageId, // ✅ matches schema field
      authorId: "david adeluola",
    });

    return newPostId;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();

    return Promise.all(
      posts.map(async (post) => {
        const imageUrl =
          post.imageId !== undefined
            ? await ctx.storage.getUrl(post.imageId)
            : null;

        return {
          ...post,
          imageId: imageUrl, // ✅ return the URL for the frontend to use
        };
      })
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    return await ctx.storage.generateUploadUrl();
  },
});
