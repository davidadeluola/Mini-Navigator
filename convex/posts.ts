// posts.ts
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";
import { Doc } from "./_generated/dataModel";


export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    tag: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")), // ✅ matches schema + correct type
    imageCreditName: v.optional(v.string()),
    imageCreditUrl: v.optional(v.string()),
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
      imageCreditName: args.imageCreditName,
      imageCreditUrl: args.imageCreditUrl,
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


  export const searchPosts = query({
    args: {
      term: v.string(),
      limit: v.number(),
    },
    handler: async (ctx, args) => {
      const limit = args.limit || 10;

      // ✅ Correct type — not Array<string>
      const results: Array<{ _id: string; title: string; content: string }> = [];
      const seenResults = new Set<string>();

      const pushResults = async (docs: Array<Doc<"posts">>) => {
        for (const doc of docs) {
          if (!seenResults.has(doc._id.toString())) {
            results.push({
              _id: doc._id,
              title: doc.title,
              content: doc.content, // ✅ was doc.title (copy-paste bug)
            });
            seenResults.add(doc._id.toString());
          }
          if (results.length >= limit) break;
        } // ✅ closing brace for the for-loop was missing
      };

      // ✅ withSearchIndex doesn't chain .take()/.order()/.limit() — collect() only
      const titleResults = await ctx.db
        .query("posts")
        .withSearchIndex("search_title", (q) => q.search("title", args.term))
        .take(limit);

      await pushResults(titleResults);

      if (results.length < limit) {
        const contentResults = await ctx.db
          .query("posts")
          .withSearchIndex("search_content", (q) =>
            q.search("content", args.term)
          )
          .take(limit);

        await pushResults(contentResults);
      }

      return results; // ✅ was missing entirely
    },
  });

