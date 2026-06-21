"use client";

import React from "react";
import type { PresenceState } from "@convex-dev/presence/react";

// ─── helpers ─────────────────────────────────────────────────────────────────

function getEmojiForUserId(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash |= 0;
  }
  const emojis = ["😊", "😃", "😎", "🤓", "😇", "🤖", "👻", "🐶", "🐱", "🐰"];
  return emojis[Math.abs(hash) % emojis.length];
}

function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return `${h}h ago`;
  }
  const d = Math.floor(diff / 86400);
  return `${d}d ago`;
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

function Avatar({
  presence,
  index,
  total,
}: {
  presence: PresenceState;
  index: number;
  total: number;
}) {
  const displayName = presence.name || presence.userId || "Anonymous";
  const isOnline = presence.online;

  return (
    <div
      className="relative group/avatar"
      style={{ zIndex: total - index, marginLeft: index === 0 ? 0 : "-0.4rem" }}
      tabIndex={0}
    >
      {/* Avatar circle */}
      <div
        className={[
          "w-[26px] h-[26px] rounded-full flex items-center justify-center text-sm",
          "border-2 cursor-default transition-transform duration-200",
          "group-hover/avatar:-translate-y-1 group-hover/avatar:scale-110",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
          isOnline
            ? "border-violet-500/70 bg-[#1a1025] shadow-[0_0_0_1px_oklch(0.55_0.25_285/0.2)]"
            : "border-white/10 bg-[#111118]",
        ].join(" ")}
      >
        {presence.image ? (
          <img
            src={presence.image}
            alt={displayName}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span
            role="img"
            aria-label={displayName}
            className={isOnline ? "opacity-100" : "opacity-30 grayscale"}
          >
            {getEmojiForUserId(presence.userId)}
          </span>
        )}
      </div>

      {/* Tooltip */}
      <div
        className={[
          "absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2",
          "bg-[#0a0a0b] border border-white/15 rounded-lg px-3 py-2",
          "shadow-[0_8px_24px_oklch(0_0_0/0.7),0_0_0_1px_oklch(0.55_0.25_285/0.08)]",
          "opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible",
          "transition-all duration-150 -translate-y-1 group-hover/avatar:translate-y-0",
          "pointer-events-none whitespace-nowrap z-50 min-w-[120px]",
        ].join(" ")}
      >
        {/* Name */}
        <p className="text-[11px] font-semibold text-white/90 truncate max-w-[160px]">
          {displayName}
        </p>

        {/* Status */}
        <p
          className={[
            "text-[10px] mt-0.5",
            isOnline ? "text-violet-400" : "text-white/35",
          ].join(" ")}
        >
          {isOnline ? "● Online now" : `○ ${getTimeAgo(presence.lastDisconnected)}`}
        </p>

        {/* CSS arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/15" />
        <div className="absolute top-full mt-[-1px] left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0a0a0b]" />
      </div>
    </div>
  );
}

// ─── Overflow dropdown (6+ users) ────────────────────────────────────────────

function MoreDropdown({ users }: { users: PresenceState[] }) {
  return (
    <div className="relative group/more ml-[-0.4rem]" tabIndex={0}>
      {/* "+N" badge */}
      <div
        className={[
          "w-[26px] h-[26px] rounded-full flex items-center justify-center",
          "border-2 border-white/10 bg-[#111118] cursor-default",
          "text-[10px] font-semibold text-white/50",
          "transition-transform duration-200 group-hover/more:-translate-y-1",
        ].join(" ")}
      >
        +{users.length}
      </div>

      {/* Dropdown panel */}
      <div
        className={[
          "absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2",
          "bg-[#0a0a0b] border border-white/12 rounded-xl",
          "shadow-[0_12px_32px_oklch(0_0_0/0.75)]",
          "opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible",
          "transition-all duration-150 -translate-y-1 group-hover/more:translate-y-0",
          "pointer-events-none z-50 w-44 overflow-hidden",
        ].join(" ")}
      >
        {users.slice(0, 10).map((p, i) => {
          const name = p.name || p.userId || "Anonymous";
          return (
            <div
              key={p.userId}
              className={[
                "flex items-center gap-2.5 px-3 py-2",
                i < users.length - 1 ? "border-b border-white/[0.05]" : "",
              ].join(" ")}
            >
              {/* Mini avatar */}
              <div className="w-6 h-6 rounded-full bg-[#1a1025] flex items-center justify-center text-xs shrink-0">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span
                    role="img"
                    aria-label={name}
                    className={p.online ? "" : "opacity-30 grayscale"}
                  >
                    {getEmojiForUserId(p.userId)}
                  </span>
                )}
              </div>

              {/* Name + status */}
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-white/80 truncate">
                  {name}
                </p>
                <p className={`text-[10px] ${p.online ? "text-violet-400" : "text-white/30"}`}>
                  {p.online ? "Online" : getTimeAgo(p.lastDisconnected)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── FacePile (exported) ─────────────────────────────────────────────────────

export default function FacePile({
  presenceState,
}: {
  presenceState: PresenceState[];
}): React.ReactElement {
  const visible = presenceState.slice(0, 5);
  const hidden = presenceState.slice(5);

  return (
    <div className="inline-flex items-center">
      {visible.map((presence, idx) => (
        <Avatar
          key={presence.userId}
          presence={presence}
          index={idx}
          total={visible.length}
        />
      ))}
      {hidden.length > 0 && <MoreDropdown users={hidden} />}
    </div>
  );
}
