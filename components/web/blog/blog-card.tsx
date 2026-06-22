import Link from "next/link";
import Image from "next/image";
import { excerpt, calculateReadTime } from "@/lib/excerpt";
import { ArrowRight } from "lucide-react";

import { FALLBACK_IMAGE, tagColors } from "@/lib/constants";

interface Post {
  _id: string;
  title: string;
  content: string;
  tag?: string;
  imageUrl?: string | null;
  _creationTime: number;
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post._id}`} className="blog-card group block">
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
            <span className="inline-flex text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/40">
              {calculateReadTime(post.content)} min read
            </span>
            <span className="text-[10px] text-white/20 ml-auto">
              {new Date(post._creationTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
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
  );
}
