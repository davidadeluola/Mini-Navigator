// schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    tag: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")), // ✅ correct system table
    authorId: v.string(),
  }),

  comments: defineTable({
    postId: v.id("posts"),
    content: v.string(),
    authorName: v.string(),
    authorId: v.string(),
  }),

  learnings: defineTable({
    date: v.string(),
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
  }),
});
