"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { excerpt } from "@/lib/excerpt";
import { usePosts } from "@/hooks/usePosts";
import {
  ArrowRight,
  Search,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  SlidersHorizontal,
} from "lucide-react";
import gsap from "gsap";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1780328766286-23e6cb082cb9?w=400&auto=format&fit=crop&q=60";

const tagColors: Record<string, string> = {
  Building: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  Tech: "border-sky-500/30 bg-sky-500/10 text-sky-400",
  Craft: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Life: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Design: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  Tutorial: "border-orange-500/30 bg-orange-500/10 text-orange-400",
};

export default function BlogPage() {
  const {
    posts,
    isLoading,
    searchQuery,
    setSearch,
    selectedTag,
    setTag,
    toggleTag,
    allTags,
    dateFrom,
    dateTo,
    setFrom,
    setTo,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    rangeStart,
    rangeEnd,
    totalCount,
    hasActiveFilters,
    clearFilters,
  } = usePosts();

  const [showFilters, setShowFilters] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Animate filter panel open/close
  useEffect(() => {
    if (!filterPanelRef.current) return;
    if (showFilters) {
      gsap.fromTo(
        filterPanelRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(filterPanelRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [showFilters]);

  // Animate post cards on page change
  useEffect(() => {
    if (!gridRef.current || isLoading) return;
    const cards = gridRef.current.querySelectorAll(".blog-card");
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, [currentPage, posts, isLoading]);

  return (
    <div>
      {/* ═══ PAGE HEADER ═══ */}
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-violet-400 mb-6 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5">
          <Sparkles className="w-3.5 h-3.5" />
          All articles
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
          Blog
        </h1>
        <p className="text-base text-white/40 leading-relaxed max-w-lg">
          Insights, thoughts, and stories — raw takes on code, craft, and
          building.
        </p>
      </div>

      {/* ═══ MODERN SEARCH & FILTER ═══ */}
      <div className="mb-10">
        {/* Search bar row */}
        <div className="flex items-stretch gap-3">
          {/* Search input */}
          <div
            className={`relative flex-1 transition-all duration-300 ${
              searchFocused
                ? "shadow-[0_0_30px_-5px_rgba(139,92,246,0.15)]"
                : ""
            }`}
          >
            <div
              className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
                searchFocused
                  ? "border-violet-500/30 bg-white/[0.04]"
                  : "border-white/8 bg-white/[0.02]"
              }`}
            />
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-300 ${
                searchFocused ? "text-violet-400" : "text-white/20"
              }`}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="relative w-full h-12 pl-11 pr-4 bg-transparent rounded-xl text-sm text-white placeholder:text-white/25 outline-none"
            />
            {/* Clear search X */}
            {searchQuery && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/25 hover:text-white/50 hover:bg-white/5 transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter toggle button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative flex items-center gap-2 px-4 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer ${
              showFilters || hasActiveFilters
                ? "border-violet-500/30 bg-violet-500/10 text-violet-400"
                : "border-white/8 bg-white/[0.02] text-white/40 hover:text-white/60 hover:border-white/12"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {/* Active filter indicator dot */}
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-violet-500 border-2 border-[#0a0a0b] animate-pulse" />
            )}
          </button>
        </div>

        {/* Expandable filter panel */}
        <div ref={filterPanelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
          <div className="pt-4 space-y-4">
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Filter by date
                </span>
                {(dateFrom || dateTo) && (
                  <button
                    onClick={() => {
                      setFrom("");
                      setTo("");
                    }}
                    className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                  >
                    Reset dates
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* From date */}
                <div className="group relative">
                  <label className="absolute -top-2 left-3 px-1.5 text-[10px] font-medium text-white/30 bg-[#131316] z-10 uppercase tracking-wider">
                    From
                  </label>
                  <div className="flex items-center gap-2 h-11 px-3 rounded-lg border border-white/8 bg-white/[0.02] group-focus-within:border-violet-500/30 transition-colors">
                    <CalendarDays className="w-4 h-4 text-white/20 shrink-0" />
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setFrom(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-white/70 outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* To date */}
                <div className="group relative">
                  <label className="absolute -top-2 left-3 px-1.5 text-[10px] font-medium text-white/30 bg-[#131316] z-10 uppercase tracking-wider">
                    To
                  </label>
                  <div className="flex items-center gap-2 h-11 px-3 rounded-lg border border-white/8 bg-white/[0.02] group-focus-within:border-violet-500/30 transition-colors">
                    <CalendarDays className="w-4 h-4 text-white/20 shrink-0" />
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setTo(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-white/70 outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* Tags section */}
              {allTags.length > 0 && (
                <div className="mt-6 border-t border-white/5 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
                      Filter by tag
                    </span>
                    {selectedTag && (
                      <button
                        onClick={() => setTag(null)}
                        className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                      >
                        Clear tag
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          selectedTag === tag
                            ? tagColors[tag] ??
                              "border-white/20 bg-white/10 text-white"
                            : "border-white/8 bg-white/[0.03] text-white/40 hover:bg-white/[0.06] hover:text-white/60"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active filters summary bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-white/25">
                {totalCount} {totalCount === 1 ? "result" : "results"}
              </span>

              {/* Filter chips */}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400">
                  &ldquo;{searchQuery}&rdquo;
                  <button
                    onClick={() => setSearch("")}
                    className="hover:text-violet-300 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedTag && (
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${
                    tagColors[selectedTag] ??
                    "border-white/20 bg-white/10 text-white"
                  }`}
                >
                  {selectedTag}
                  <button
                    onClick={() => setTag(null)}
                    className="hover:opacity-70 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {dateFrom && (
                <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400">
                  From: {dateFrom}
                  <button
                    onClick={() => setFrom("")}
                    className="hover:text-sky-300 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {dateTo && (
                <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400">
                  To: {dateTo}
                  <button
                    onClick={() => setTo("")}
                    className="hover:text-sky-300 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={clearFilters}
              className="text-[11px] text-white/30 hover:text-white/50 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ═══ POSTS GRID ═══ */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div className="glass-card overflow-hidden animate-pulse" key={i}>
              <div className="w-full aspect-video bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-16 rounded-full bg-white/5" />
                <div className="h-5 w-3/4 rounded bg-white/5" />
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-5/6 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <>
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post._id}`}
                className="blog-card group block"
              >
                <article className="post-card glass-card overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="w-full aspect-video relative overflow-hidden">
                    <Image
                      src={post.imageUrl ?? FALLBACK_IMAGE}
                      alt={post.title}
                      height={200}
                      width={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Tag + date row */}
                    <div className="flex items-center gap-2 mb-3">
                      {post.tag && (
                        <span
                          className={`inline-flex text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${
                            tagColors[post.tag] ??
                            "border-white/15 bg-white/5 text-white/50"
                          }`}
                        >
                          {post.tag}
                        </span>
                      )}
                      <span className="text-[10px] text-white/20 ml-auto">
                        {new Date(post._creationTime).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </div>

                    <h2 className="text-base font-semibold text-white/90 group-hover:text-white transition-colors leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-white/35 leading-relaxed line-clamp-3 flex-1 mb-4">
                      {excerpt(post.content, 120)}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-violet-400 font-medium group-hover:gap-3 transition-all">
                      Read post
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* ═══ PAGINATION ═══ */}
          {totalPages > 1 && (
            <div className="mt-14 flex flex-col items-center gap-4">
              <div className="flex items-center gap-1.5">
                {/* Previous */}
                <button
                  onClick={prevPage}
                  disabled={!canGoPrev}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/6 text-white/30 hover:text-white/60 hover:border-white/12 hover:bg-white/[0.04] disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                        page === currentPage
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20 scale-105"
                          : "text-white/30 hover:text-white/60 hover:bg-white/[0.04]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={nextPage}
                  disabled={!canGoNext}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/6 text-white/30 hover:text-white/60 hover:border-white/12 hover:bg-white/[0.04] disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Page info */}
              <p className="text-[11px] text-white/15 tracking-wide">
                {rangeStart}–{rangeEnd} of {totalCount}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="glass-card p-16 text-center">
          <p className="text-white/40 text-lg mb-2">
            {hasActiveFilters
              ? "No posts match your filters."
              : "No posts yet."}
          </p>
          <p className="text-white/25 text-sm">
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="text-violet-400 hover:text-violet-300 underline underline-offset-4 cursor-pointer"
              >
                Clear all filters
              </button>
            ) : (
              "Check back soon for new content."
            )}
          </p>
        </div>
      )}
    </div>
  );
}
