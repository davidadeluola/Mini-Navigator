import React from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-7xl">
          {" "}
          {/* ← wrap children in a width container */}
          {children}
        </div>
      </div>
    </>
  );
};

export default BlogLayout;
