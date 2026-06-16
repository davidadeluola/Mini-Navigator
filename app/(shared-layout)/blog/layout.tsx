import React from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e8e6e1]">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">{children}</div>
    </div>
  );
};

export default BlogLayout;
