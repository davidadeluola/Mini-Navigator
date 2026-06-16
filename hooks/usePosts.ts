"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const POSTS_PER_PAGE = 6;

export function usePosts() {
  const posts = useQuery(api.posts.getPosts, {});

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Collect all unique tags from posts
  const allTags = useMemo(() => {
    if (!posts) return [];
    const tags = new Set<string>();
    for (const post of posts) {
      if (post.tag) tags.add(post.tag);
    }
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts by search + tag + date
  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    return posts.filter((post) => {
      // Search by title (case-insensitive)
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by tag
      const matchesTag = selectedTag === null || post.tag === selectedTag;

      // Filter by date range using _creationTime
      const postDate = new Date(post._creationTime);
      const matchesDateFrom =
        dateFrom === "" || postDate >= new Date(dateFrom + "T00:00:00");
      const matchesDateTo =
        dateTo === "" || postDate <= new Date(dateTo + "T23:59:59");

      return matchesSearch && matchesTag && matchesDateFrom && matchesDateTo;
    });
  }, [posts, searchQuery, selectedTag, dateFrom, dateTo]);

  // Pagination calculations
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  // Range info for "Showing X–Y of Z"
  const rangeStart =
    filteredPosts.length > 0 ? (safePage - 1) * POSTS_PER_PAGE + 1 : 0;
  const rangeEnd = Math.min(safePage * POSTS_PER_PAGE, filteredPosts.length);
  const totalCount = filteredPosts.length;

  // Actions — all reset to page 1 on filter change
  const setSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const setTag = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    setCurrentPage(1);
  };

  const setFrom = (value: string) => {
    setDateFrom(value);
    setCurrentPage(1);
  };

  const setTo = (value: string) => {
    setDateTo(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => goToPage(safePage + 1);
  const prevPage = () => goToPage(safePage - 1);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedTag !== null ||
    dateFrom !== "" ||
    dateTo !== "";
  const isLoading = posts === undefined;

  return {
    // Data
    posts: paginatedPosts,
    isLoading,

    // Search
    searchQuery,
    setSearch,

    // Tag filter
    selectedTag,
    setTag,
    toggleTag,
    allTags,

    // Date filters
    dateFrom,
    dateTo,
    setFrom,
    setTo,

    // Pagination
    currentPage: safePage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    canGoNext: safePage < totalPages,
    canGoPrev: safePage > 1,

    // Info
    rangeStart,
    rangeEnd,
    totalCount,
    hasActiveFilters,
    clearFilters,
  };
}
