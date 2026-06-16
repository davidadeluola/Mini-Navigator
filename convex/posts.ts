// posts.ts
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    tag: v.optional(v.string()),
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
      tag: args.tag,
      imageId: args.imageId, // ✅ matches schema field
      authorId: user.userId ?? "anonymous",
    });

    return newPostId;
  },
});

export const getPosts = query({
  args: {
    authorId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("posts");
    
    // Filter by author if provided
    if (args.authorId) {
      query = query.filter((q) => q.eq(q.field("authorId"), args.authorId));
    }
    
    const posts = await query.order("desc").collect();

    return Promise.all(
      posts.map(async (post) => {
        const imageUrl =
          post.imageId !== undefined
            ? await ctx.storage.getUrl(post.imageId)
            : null;

        return {
          ...post,
          imageUrl, // ✅ return the URL for the frontend to use
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

export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, { postId }) => {
    const post = await ctx.db.get(postId);
    if (!post) {
      throw new ConvexError("Post not found");
    }

    let imageUrl: string | null = null;

    if (post.imageId) {
      const url = await ctx.storage.getUrl(post.imageId);
      imageUrl = url ?? null; // getUrl can return null if file doesn't exist
    }

    return {
      ...post,
      imageUrl,
    };
  },
});
