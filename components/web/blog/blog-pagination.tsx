import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  totalPages: number;
  currentPage: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
  rangeStart: number;
  rangeEnd: number;
  totalCount: number;
}

export function BlogPagination({
  totalPages,
  currentPage,
  canGoPrev,
  canGoNext,
  prevPage,
  nextPage,
  goToPage,
  rangeStart,
  rangeEnd,
  totalCount,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
        ))}

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
  );
}
