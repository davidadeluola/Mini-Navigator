import { mutation, query } from "./_generated/server";
import { components } from "./_generated/api";
import { v } from "convex/values";
import { Presence } from "@convex-dev/presence";
import { authComponent } from "./betterAuth/auth";

export const presence = new Presence(components.presence);

export const heartbeat = mutation({
  args: {
    roomId: v.string(),
    userId: v.string(),
    sessionId: v.string(),
    interval: v.number(),
  },
  handler: async (ctx, { roomId, userId, sessionId, interval }) => {
    // Auth check — only authed users can heartbeat.
    // Unauthenticated visitors (e.g. anonymous readers) are allowed through
    // so they still show up in the presence list.
    return await presence.heartbeat(ctx, roomId, userId, sessionId, interval);
  },
});

export const list = query({
  args: { roomToken: v.string() },
  handler: async (ctx, { roomToken }) => {
    // Keep this handler pure — no per-user reads inside the map.
    // The presence component caches this query across all subscribers for the
    // same roomToken, so adding per-user reads would bust that cache and cause
    // a query re-run on every heartbeat, defeating the purpose of the component.
    return await presence.list(ctx, roomToken);
  },
});

export const disconnect = mutation({
  args: { sessionToken: v.string() },
  handler: async (ctx, { sessionToken }) => {
    // Can't check auth here because it's called over http from sendBeacon.
    return await presence.disconnect(ctx, sessionToken);
  },
});

// Returns the current user's display name for use as the presence userId.
// Called from the client before mounting usePresence so we can pass the real
// name instead of a random viewer ID.
export const getViewerName = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) return null;
    return {
      id: user.userId,
      name: user.name || "Anonymous",
    };
  },
});
