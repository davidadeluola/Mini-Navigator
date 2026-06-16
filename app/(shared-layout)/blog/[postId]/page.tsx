import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CommentSection from "@/components/web/Comment";
import { preloadQuery } from "convex/nextjs";
import { calculateReadTime } from "@/lib/excerpt";

import { FALLBACK_IMAGE as FALLBACK, tagColors } from "@/lib/constants";
interface PostIdProps {
  params: Promise<{ postId: Id<"posts"> }>;
}

import { Metadata } from "next";

export async function generateMetadata({ params }: PostIdProps): Promise<Metadata> {
  const { postId } = await params;
  try {
    const postData = await fetchQuery(api.posts.getPostById, { postId });
    return {
      title: postData.title,
      description: postData.content.substring(0, 160) + "...",
      openGraph: {
        images: [postData.imageUrl || FALLBACK],
      },
    };
  } catch (error) {
    return {
      title: "Post Not Found",
    };
  }
}

const PostId = async ({ params }: PostIdProps) => {
  const { postId } = await params;

  const [postData, preloadedComments] = await Promise.all([
    fetchQuery(api.posts.getPostById, { postId }),
    preloadQuery(api.comments.getCommentsByPostId, { postId }),
  ]);

  if (!postData) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center space-y-4">
        <p className="text-white/40 text-lg">Post not found.</p>
        <Link
          href="/blog"
          className={buttonVariants({
            variant: "outline",
            className:
              "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
          })}
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Hero image */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden glass-card group/image">
        <Image
          src={
            postData.imageUrl && postData.imageUrl.length > 0
              ? postData.imageUrl
              : FALLBACK
          }
          alt={postData.title}
          fill={true}
          className="object-cover hover:scale-105 transition-transform duration-500"
          priority
        />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/80 via-transparent to-transparent pointer-events-none" />

        {/* Image Credit Overlay */}
        {(postData.imageCreditName || postData.imageCreditUrl) && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-md px-3 py-1.5 text-xs text-white/70 shadow-xl flex items-center gap-1.5">
              <span className="text-white/40">Photo by</span>
              {postData.imageCreditUrl ? (
                <a 
                  href={postData.imageCreditUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 transition-colors font-medium hover:underline"
                >
                  {postData.imageCreditName || "Original"}
                </a>
              ) : (
                <span className="font-medium text-white/90">{postData.imageCreditName}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="mt-10 space-y-4">
        {/* Tag */}
        <div className="flex items-center flex-wrap gap-3">
          {postData.tag && (
            <span
              className={`inline-flex text-[11px] font-medium px-3 py-1 rounded-full border ${
                tagColors[postData.tag] ??
                "border-white/15 bg-white/5 text-white/50"
              }`}
            >
              {postData.tag}
            </span>
          )}
          <span className="inline-flex text-[11px] font-medium px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/40">
            {calculateReadTime(postData.content)} min read
          </span>
          <span className="text-xs text-white/25 flex items-center gap-1.5 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            {new Date(postData._creationTime).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
          {postData.title}
        </h1>
        <p className="text-sm text-white/30">By {postData.authorId}</p>
      </div>

      {/* Divider */}
      <div className="my-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="prose-dark">
        <p className="text-base text-white/70 font-mono leading-8 whitespace-pre-wrap">
          {postData.content}
        </p>
      </div>

      {/* Divider */}
      <div className="my-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Comments */}
      <div className="mt-4">
        <CommentSection preloadedComments={preloadedComments} />
      </div>
    </article>
  );
};

export default PostId;
