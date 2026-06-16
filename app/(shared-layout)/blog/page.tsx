"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { Sparkles } from "lucide-react";
import gsap from "gsap";
import { BlogFilters } from "@/components/web/blog/blog-filters";
import { BlogCard } from "@/components/web/blog/blog-card";
import { BlogPagination } from "@/components/web/blog/blog-pagination";
import { Footer } from "@/components/web/footer";

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
    <div className="min-h-screen bg-[#0a0a0b] text-[#e8e6e1] relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-violet -top-20 -right-40 opacity-20" />
      <div className="orb orb-blue bottom-40 -left-60 opacity-15" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20">
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
        <BlogFilters
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
          searchQuery={searchQuery}
          setSearch={setSearch}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasActiveFilters={hasActiveFilters}
          filterPanelRef={filterPanelRef}
          dateFrom={dateFrom}
          setFrom={setFrom}
          dateTo={dateTo}
          setTo={setTo}
          allTags={allTags}
          selectedTag={selectedTag}
          setTag={setTag}
          toggleTag={toggleTag}
          totalCount={totalCount}
          clearFilters={clearFilters}
        />

        {/* ═══ POSTS GRID ═══ */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {[...Array(4)].map((_, i) => (
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
                <BlogCard key={post._id} post={post} />
              ))}
            </div>

            {/* ═══ PAGINATION ═══ */}
            <BlogPagination
              totalPages={totalPages}
              currentPage={currentPage}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
              prevPage={prevPage}
              nextPage={nextPage}
              goToPage={goToPage}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              totalCount={totalCount}
            />
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

      <Footer />
    </div>
  );
}