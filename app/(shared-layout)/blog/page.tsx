"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const BlogPage = () => {
  const postsData = useQuery(api.posts.getPosts, {});

  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold mb-3">Blog</h1>
      <p className="text-lg text-muted-foreground mb-10">
        The latest posts and updates.
      </p>

      {postsData === undefined ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : postsData.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsData.map((post) => (
            <li
              key={post._id}
              className="border border-border rounded-xl p-6 hover:bg-accent transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground text-sm line-clamp-4">
                {post.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPage;
