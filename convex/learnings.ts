import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const createLearning = mutation({
  args: {
    date: v.string(),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const newLearningId = await ctx.db.insert("learnings", {
      date: args.date,
      title: args.title,
      content: args.content,
      authorId: user.userId ?? "anonymous",
    });

    return newLearningId;
  },
});

export const getLearnings = query({
  args: {},
  handler: async (ctx) => {
    const learnings = await ctx.db
      .query("learnings")
      .order("desc")
      .take(50);

    return learnings;
  },
});
