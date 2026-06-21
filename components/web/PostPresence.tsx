"use client";

import React, { useState, useTransition, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import usePresence from "@convex-dev/presence/react";
import FacePile from "@/components/web/FacePile";
import { Id } from "@/convex/_generated/dataModel";
import { Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { PresenceState } from "@convex-dev/presence/react";

interface PostPresenceProps {
  roomId: Id<"posts">;
  userId: string;
}

// Stable anonymous ID scoped to the browser session (not the user account).
// Used as a fallback when the viewer isn't signed in.
function getOrCreateViewerId(): string {
  const key = "mini_navigator_viewer_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = "viewer_" + Math.random().toString(36).slice(2);
    sessionStorage.setItem(key, id);
  }
  return id;
}

function formatInlineNames(entries: PresenceState[], viewerName: string): string {
  const names = entries.map((e) =>
    // The userId IS the display name — we pass name as userId in usePresence
    e.userId === viewerName ? "You" : e.name || e.userId || "Anonymous"
  );
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names[0]}, ${names[1]} & ${names.length - 2} more`;
}

const PresenceSkeleton = () => (
  <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
    <Skeleton className="h-2 w-2 rounded-full" />
    <Skeleton className="h-3.5 w-3.5 rounded" />
    <Skeleton className="h-2.5 w-16 rounded-full" />
    <div className="h-3.5 w-px bg-white/10 mx-1" />
    <div className="flex -space-x-1.5">
      {[...Array(2)].map((_, i) => (
        <Skeleton key={i} className="h-5 w-5 rounded-full" />
      ))}
    </div>
  </div>
);

const PostPresence = ({ roomId }: PostPresenceProps) => {
  // Fetch the signed-in user's name to use as the presence identifier.
  // If they're not signed in, we fall back to the anonymous session ID.
  const viewer = useQuery(api.presence.getViewerName);

  const [viewerName] = useState<string>(() => {
    if (typeof window !== "undefined") return getOrCreateViewerId();
    return "anonymous";
  });

  // Once we know the viewer's real name, use that — otherwise keep the anon ID.
  // viewer === undefined means loading; viewer === null means not signed in.
  const presenceName =
    viewer?.name ?? viewerName;

  const [isPending, startTransition] = useTransition();
  const [ready, setReady] = useState(false);

  const presenceState = usePresence(api.presence, roomId, presenceName);

  useEffect(() => {
    if (presenceState && presenceState.length > 0 && !ready) {
      startTransition(() => setReady(true));
    }
  }, [presenceState, ready]);

  if (!ready || isPending) return <PresenceSkeleton />;
  if (!presenceState || presenceState.length === 0) return null;

  const inlineLabel = formatInlineNames(presenceState, presenceName);

  return (
    <div
      className={`inline-flex items-center gap-3 px-3 sm:px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-opacity duration-500 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Live dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
      </span>

      {/* Eye + count */}
      <span className="inline-flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5 text-white/30 shrink-0" />
        <span className="text-[11px] text-white/40 font-medium leading-none">
          {presenceState.length} reading
        </span>
      </span>

      {/* Inline names — hidden on mobile */}
      <span className="text-[11px] text-white/70 hidden sm:block max-w-[160px] truncate">
        {inlineLabel}
      </span>

      {/* Divider */}
      <div className="h-3.5 w-px bg-white/10 mx-0.5 shrink-0" />

      {/* FacePile — styled via globals.css overrides */}
      <FacePile presenceState={presenceState} />
    </div>
  );
};

export default PostPresence;