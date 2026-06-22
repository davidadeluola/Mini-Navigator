import React, { useState, useEffect, useRef } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Clean React way to debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Query Convex backend
  const searchResults = useQuery(
    api.posts.searchPosts,
    debouncedQuery.trim() !== "" ? { term: debouncedQuery, limit: 5 } : "skip"
  );

  const isSearching =
    query !== debouncedQuery || (debouncedQuery && searchResults === undefined);
  const showDropdown = isOpen && query.length > 0;

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className ?? "w-full max-w-sm"}`}
    >
      <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 shadow-none focus-visible:ring-0 w-full"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (query.length > 0) setIsOpen(true);
        }}
      />

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-md shadow-lg z-50 overflow-hidden flex flex-col">
          {isSearching ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              Searching...
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="flex flex-col py-2">
              {searchResults.map((post) => (
                <div
                  key={post._id}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    setDebouncedQuery("");
                    router.push(`/blog/${post._id}`);
                  }}
                  className="px-4 py-2 hover:bg-accent cursor-pointer transition-colors"
                >
                  <p className="text-sm font-medium line-clamp-1">
                    {post.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
