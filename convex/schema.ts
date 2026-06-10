// schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    imageId: v.optional(v.id("_storage")), // ✅ correct system table
    authorId: v.string(),
  }),
});