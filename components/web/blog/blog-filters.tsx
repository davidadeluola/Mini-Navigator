import { Search, X, SlidersHorizontal, CalendarDays } from "lucide-react";

import { tagColors } from "@/lib/constants";

interface BlogFiltersProps {
  searchFocused: boolean;
  setSearchFocused: (focused: boolean) => void;
  searchQuery: string;
  setSearch: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  hasActiveFilters: boolean;
  filterPanelRef: React.RefObject<HTMLDivElement | null>;
  dateFrom: string;
  setFrom: (date: string) => void;
  dateTo: string;
  setTo: (date: string) => void;
  allTags: string[];
  selectedTag: string | null;
  setTag: (tag: string | null) => void;
  toggleTag: (tag: string) => void;
  totalCount: number;
  clearFilters: () => void;
}

export function BlogFilters({
  searchFocused,
  setSearchFocused,
  searchQuery,
  setSearch,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  filterPanelRef,
  dateFrom,
  setFrom,
  dateTo,
  setTo,
  allTags,
  selectedTag,
  setTag,
  toggleTag,
  totalCount,
  clearFilters,
}: BlogFiltersProps) {
  return (
    <div className="mb-10">
      {/* Search bar row */}
      <div className="flex items-stretch gap-3">
        {/* Search input */}
        <div
          className={`relative flex-1 transition-all duration-300 ${
            searchFocused ? "shadow-[0_0_30px_-5px_rgba(139,92,246,0.15)]" : ""
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
      <div
        ref={filterPanelRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
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
  );
}
