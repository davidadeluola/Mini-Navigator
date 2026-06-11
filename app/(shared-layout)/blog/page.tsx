import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { excerpt } from "@/lib/excerpt";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-static"; // Ensure this page is always server-rendered to fetch fresh data
export const revalidate = 60; // Disable ISR for this page to always serve fresh data on each request

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1780328766286-23e6cb082cb9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8";

const BlogPage = async () => {
  const postsData = await fetchQuery(api.posts.getPosts);

  const isLoading = postsData === undefined;
  const isEmpty = Array.isArray(postsData) && postsData.length === 0;

  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold mb-3 tracking-tight">Blog</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Insights, thoughts, and stories from our team.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-muted-foreground text-lg">No posts yet.</p>
          <p className="text-muted-foreground text-sm mt-1">
            Check back soon for new content.
          </p>
        </div>
      ) : (
        <Suspense fallback={<SkeletonUILoading />}>
          <BlogList />
        </Suspense>
      )}
    </div>
  );
};

export default BlogPage;

export async function BlogList() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
  const postsData = await fetchQuery(api.posts.getPosts);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsData.map((post) => (
          <Card
            key={post._id}
            className="border border-border rounded-xl p-4 h-full flex flex-col hover:bg-accent transition-colors duration-200 "
          
          >
            <div className="w-full aspect-video relative rounded-lg overflow-hidden mb-4">
              <Image
                src={post.imageUrl ?? FALLBACK_IMAGE}
                alt={post.title}
                height={200}
                width={400}
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm line-clamp-3 flex-1 mb-4">
                {excerpt(post.content, 120)}
              </p>

              <Link
                href={`/blog/${post._id}`}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary/90 hover:gap-3 w-fit cursor-pointer"
              >
                Read post <ArrowRight size={14} />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

async function SkeletonUILoading() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div className="flex flex-col space-y-3" key={i}>
            <Skeleton className="w-full aspect-video rounded-lg" />
            <div className="space-y-2 flex flex-col">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
